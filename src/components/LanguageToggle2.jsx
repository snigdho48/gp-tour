import React, { useEffect, useState } from "react";
import "flag-icons/css/flag-icons.min.css";

/* Helpers */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function dispatchChange(el) {
  if (!el) return;
  try {
    el.value && el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    // older event fallback
    try {
      const ev = document.createEvent("HTMLEvents");
      ev.initEvent("change", true, false);
      el.dispatchEvent(ev);
    } catch(e) {
      console.log(e)
    }
  } catch (e) {
    console.warn("dispatchChange error", e);
  }
}

function waitForCombo(timeout = 5000) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(".goog-te-combo");
    if (existing) return resolve(existing);

    const obs = new MutationObserver(() => {
      const el = document.querySelector(".goog-te-combo");
      if (el) {
        obs.disconnect();
        resolve(el);
      }
    });

    obs.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      obs.disconnect();
      const el = document.querySelector(".goog-te-combo");
      if (el) return resolve(el);
      reject(new Error("Timeout waiting for .goog-te-combo"));
    }, timeout);
  });
}

/* Translation routine that tries multiple ways */
async function applyGoogleTranslateTarget(
  targetLang,
  { allowReload = true } = {}
) {
  console.log("[gt] applyGoogleTranslateTarget ->", targetLang);

  // 1) If doGTranslate exists (often defined by the widget), try it
  if (typeof window.doGTranslate === "function") {
    try {
      console.log("[gt] using doGTranslate('en|" + targetLang + "')");
      window.doGTranslate(`en|${targetLang}`);
      return true;
    } catch (e) {
      console.warn("[gt] doGTranslate failed:", e);
    }
  }

  // 2) Wait for and use the .goog-te-combo select (preferred)
  let select;
  try {
    select = await waitForCombo(4000);
  } catch (e) {
    console.warn("[gt] .goog-te-combo not found:", e);
  }

  if (select) {
    try {
      // Force reset -> reapply sequence to ensure Google re-runs translation
      // Step A: set to English (safe default), dispatch change
      select.value = "en";
      dispatchChange(select);

      // tiny wait for Google internals to pick up the reset
      await sleep(120);

      // Step B: set to target and dispatch change
      select.value = targetLang;
      dispatchChange(select);

      console.log("[gt] changed via .goog-te-combo to", targetLang);
      return true;
    } catch (err) {
      console.warn("[gt] selecting value failed:", err);
    }
  }

  // 3) Cookie fallback (no UI events) - non-destructive attempt
  try {
    console.log("[gt] setting googtrans cookie fallback");
    // If hosted on real domain and you need cross-subdomain, set domain=.yourdomain.com
    document.cookie = `googtrans=/en/${targetLang};path=/`;
    // attempt to re-init widget in case it will read cookie
    if (
      window.google &&
      window.google.translate &&
      typeof window.google.translate.TranslateElement === "function"
    ) {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,bn",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      } catch (e) {
        // ignore
        console.log(e)
      }
    }
    // try once more to hit the select if it appeared
    const sel2 = document.querySelector(".goog-te-combo");
    if (sel2) {
      sel2.value = targetLang;
      dispatchChange(sel2);
      console.log("[gt] succeeded after cookie fallback");
      return true;
    }
  } catch (e) {
    console.warn("[gt] cookie fallback failed", e);
  }

  // 4) Last resort: reload the page after writing cookie (only if allowed)
  if (allowReload) {
    console.warn(
      "[gt] last resort: reloading page to apply translation (will set cookie)."
    );
    document.cookie = `googtrans=/en/${targetLang};path=/`;
    // small delay for cookie set to flush (not strictly necessary)
    await sleep(80);
    window.location.reload();
    return true; // page will reload
  }

  console.error("[gt] all translation attempts failed");
  return false;
}

/* Component */
const languages = [
  { code: "en", name: "English", flag: "us" },
  { code: "bn", name: "বাংলা", flag: "bd" },
];

const LanguageToggleTest = () => {
  const [currentLanguage, setCurrentLanguage] = useState("bn");

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") || "bn";
    setCurrentLanguage(saved);

    // Wait a tiny bit to let the Google widget initialize, then apply
    (async () => {
      // If widget hasn't been initialized yet, wait up to ~4s for it
      const start = Date.now();
      while (!window.__gtInited && Date.now() - start < 4000) {
        await sleep(100);
      }
      try {
        // Try to apply saved language (no reload here)
        if (saved !== "en") {
          await applyGoogleTranslateTarget(saved, { allowReload: false });
        }
      } catch (e) {
        console.warn("[gt] error applying saved language", e);
      }
    })();
  }, []);

  const handleLanguageChange = async (langCode) => {
    if (langCode === currentLanguage) return;
    setCurrentLanguage(langCode);
    localStorage.setItem("preferredLanguage", langCode);

    try {
      await applyGoogleTranslateTarget(langCode, { allowReload: true });
    } catch (e) {
      console.error("Language change failed:", e);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
        Language:
      </span>

      <div className="flex gap-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`px-3 py-2 flex items-center gap-2 rounded-md text-sm font-medium transition-all duration-200
              ${
                currentLanguage === lang.code
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            title={`Switch to ${lang.name}`}
          >
            <span className={`fi fi-${lang.flag} text-base`}></span>
            <span>{lang.name === "English" ? "English" : "Bangla"}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageToggleTest;

export function GoogleTranslateLoader({
  pageLanguage = "en",
  includedLanguages = "en,bn",
}) {
  useEffect(() => {
    const id = "google-translate-script";
    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.id = id;
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Callback that the Google script will call
    window.googleTranslateElementInit = () => {
      // guard: sometimes called multiple times in StrictMode
      const container = document.getElementById("google_translate_element");
      if (container && container.dataset.inited === "1") {
        window.__gtInited = true;
        return;
      }

      try {
        if (!window.google || !window.google.translate) {
          console.warn("google.translate not ready");
          return;
        }

        new window.google.translate.TranslateElement(
          {
            pageLanguage,
            includedLanguages,
            autoDisplay: false,
          },
          "google_translate_element"
        );

        if (container) container.dataset.inited = "1";
        window.__gtInited = true;
        console.log("Google Translate widget initialized");
      } catch (e) {
        console.error("Google Translate init error:", e);
      }
    };

    return () => {
      // we don't remove the script on unmount; keep singleton across app
    };
  }, [pageLanguage, includedLanguages]);

  // keep the container in DOM (Google needs it). Hidden by default.
  return <div id="google_translate_element" style={{ display: "none" }}></div>;
}
