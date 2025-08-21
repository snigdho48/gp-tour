import React from 'react';
import TranslatedText from './TranslatedText';

function HowToBeGPStar({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4'>
      <div className='bg-white/95 drop-shadow-xl shadow-amber-50/10  dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20 dark:border-gray-700/20'>
        <div className='p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white font-telenor'>
              How to be a GPStar
            </h2>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          <div className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-4'>
            <p>
              Become a GPStar and unlock exclusive travel benefits and
              opportunities!
            </p>

            <div>
              <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                🌟 What is GPStar?
              </h3>
              <p>
                GPStar is our premium membership program that gives you access
                to exclusive travel deals, personalized planning, and VIP
                services.
              </p>
            </div>

            <div>
              <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                🎯 Benefits of Being a GPStar
              </h3>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>Exclusive travel deals and discounts</li>
                <li>Priority customer support</li>
                <li>Personalized trip recommendations</li>
                <li>Early access to new features</li>
                <li>Special roaming packages</li>
                <li>Travel insurance benefits</li>
              </ul>
            </div>

            <div>
              <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                📱 How to Join
              </h3>
              <p>
                To become a GPStar member, contact our customer service team or
                visit any GPStar store. Membership is free with qualifying
                services.
              </p>
            </div>

            <div>
              <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                📞 Contact Information
              </h3>
              <p>
                Call: 121 (GPStar Customer Care)
                <br />
                Email: gpstar@gpstar.com
                <br />
                Visit: Any GPStar store nationwide
              </p>
            </div>

            <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800'>
              <p className='text-blue-800 dark:text-blue-200 font-medium'>
                🚀 Ready to become a GPStar? Contact us today and start your
                premium travel journey!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToBeGPStar;
