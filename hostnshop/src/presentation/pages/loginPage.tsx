import React from 'react';

const LoginForm = () => {
  return (
    <div className="min-h-screen bg-grayLight flex items-center justify-center">
      <div className="bg-cardBg p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-2">
            <div className="h-8 w-8 bg-bg_primary rounded-lg mr-2"></div>
            <span className="text-2xl font-bold text-textPrimary">HostNShop</span>
          </div>
        </div>

        <form className="space-y-6">
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-textPrimary mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-grayLight rounded-md focus:outline-none focus:ring-2 focus:ring-bg_primary"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-textPrimary mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-grayLight rounded-md focus:outline-none focus:ring-2 focus:ring-bg_primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-bg_primary border-grayLight rounded focus:ring-bg_primary"
              />
              <label 
                htmlFor="remember" 
                className="ml-2 text-sm text-textSecondary"
              >
                Remember this Device
              </label>
            </div>
            <a 
              href="#" 
              className="text-sm text-link hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-bg_primary text-accent py-2 px-4 rounded-md hover:bg-btn_hover transition-colors duration-200"
          >
            Sign In
          </button>

        
        </form>
      </div>
    </div>
  );
};

export default LoginForm;