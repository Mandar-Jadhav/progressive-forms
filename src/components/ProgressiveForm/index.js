import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Edit2, Check } from 'lucide-react';
import './app.css';

const ProgressiveForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditing, setIsEditing] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    favoriteSport: '',
    favoriteTeam: '',
    favoriteSportPlayer: '',
    sportIcon: 'football'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalSteps = 7;

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) {
          newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 3) {
          newErrors.fullName = 'Full name must be at least 2 characters';
        }
        break;
      case 2:
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        break;
      case 3:
        if (!formData.mobile.trim()) {
          newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
          newErrors.mobile = 'Please enter a valid 10-digit mobile number';
        }
        break;
      case 4:
        if (!formData.city.trim()) {
          newErrors.city = 'City is required';
        } else if (formData.city.trim().length < 2) {
          newErrors.city = 'City name must be at least 2 characters';
        }
        break;
      case 5:
        if (!formData.favoriteSport.trim()) {
          newErrors.favoriteSport = 'Please enter your favorite sport';
        } else if (formData.favoriteSport.trim().length < 2) {
          newErrors.favoriteSport = 'Sport name must be at least 2 characters';
        }
        break;
      case 6:
        if (!formData.favoriteTeam.trim()) {
          newErrors.favoriteTeam = 'Please enter your favorite team';
        } else if (formData.favoriteTeam.trim().length < 2) {
          newErrors.favoriteTeam = 'Team name must be at least 2 characters';
        }
        break;
      case 7:
        if (!formData.favoriteSportPlayer.trim()) {
          newErrors.favoriteSportPlayer = 'Please enter your favorite sport player';
        } else if (formData.favoriteSportPlayer.trim().length < 2) {
          newErrors.favoriteSportPlayer = 'Player name must be at least 2 characters';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Reset favorite team when sport changes
    if (field === 'favoriteSport') {
      setFormData(prev => ({
        ...prev,
        favoriteTeam: '',
        favoriteSportPlayer: ''
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsSubmitted(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEdit = (field) => {
    setIsEditing(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleSaveField = (field) => {
    if (validateField(field)) {
      setIsEditing(prev => ({
        ...prev,
        [field]: false
      }));
    }
  };

  const validateField = (field) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'fullName':
        if (!formData.fullName.trim()) {
          newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 2) {
          newErrors.fullName = 'Full name must be at least 2 characters';
        } else {
          delete newErrors.fullName;
        }
        break;
      case 'email':
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'mobile':
        if (!formData.mobile.trim()) {
          newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
          newErrors.mobile = 'Please enter a valid 10-digit mobile number';
        } else {
          delete newErrors.mobile;
        }
        break;
      case 'city':
        if (!formData.city.trim()) {
          newErrors.city = 'City is required';
        } else if (formData.city.trim().length < 2) {
          newErrors.city = 'City name must be at least 2 characters';
        } else {
          delete newErrors.city;
        }
        break;
      case 'favoriteSport':
        if (!formData.favoriteSport.trim()) {
          newErrors.favoriteSport = 'Please enter your favorite sport';
        } else if (formData.favoriteSport.trim().length < 2) {
          newErrors.favoriteSport = 'Sport name must be at least 2 characters';
        } else {
          delete newErrors.favoriteSport;
        }
        break;
      case 'favoriteTeam':
        if (!formData.favoriteTeam.trim()) {
          newErrors.favoriteTeam = 'Please enter your favorite team';
        } else if (formData.favoriteTeam.trim().length < 2) {
          newErrors.favoriteTeam = 'Team name must be at least 2 characters';
        } else {
          delete newErrors.favoriteTeam;
        }
        break;
      case 'favoriteSportPlayer':
        if (!formData.favoriteSportPlayer.trim()) {
          newErrors.favoriteSportPlayer = 'Please enter your favorite sport player';
        } else if (formData.favoriteSportPlayer.trim().length < 2) {
          newErrors.favoriteSportPlayer = 'Player name must be at least 2 characters';
        } else {
          delete newErrors.favoriteSportPlayer;
        }
        break;
      case 'sportIcon':
        if (!formData.sportIcon) {
          newErrors.sportIcon = 'Please select a sport icon';
        } else {
          delete newErrors.sportIcon;
        }
        break;
    }

    setErrors(newErrors);
    return !newErrors[field];
  };

  const handleFinalSave = () => {
    // Validate all fields
    let allValid = true;
    const allFields = ['fullName', 'email', 'mobile', 'city', 'favoriteSport', 'favoriteTeam', 'favoriteSportPlayer', 'sportIcon'];

    allFields.forEach(field => {
      if (!validateField(field)) {
        allValid = false;
      }
    });

    if (allValid) {
      setShowSuccess(true);
      // Reset editing states
      setIsEditing({});

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label for="fullname" className="block text-sm font-medium text-gray-700 mb-3">
                Full Name
              </label>
              <input
                type="text"
                name='fullname'
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.fullName ? 'border-red-500' : 'border-gray-200'
                  }`}
                placeholder="Enter your full name"
                autoFocus
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label for="email" className="block text-sm font-medium text-gray-700 mb-3">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                placeholder="Enter your email address"
                autoFocus
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Mobile Number
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.mobile ? 'border-red-500' : 'border-gray-200'
                  }`}
                placeholder="Enter your mobile number"
                autoFocus
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-2">{errors.mobile}</p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.city ? 'border-red-500' : 'border-gray-200'
                  }`}
                placeholder="Enter your city"
                autoFocus
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-2">{errors.city}</p>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Favorite Sport
              </label>
              <input
                type="text"
                value={formData.favoriteSport}
                onChange={(e) => handleInputChange('favoriteSport', e.target.value)}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.favoriteSport ? 'border-red-500' : 'border-gray-200'
                  }`}
                placeholder="e.g., Cricket, Football, Basketball"
                autoFocus
              />
              {errors.favoriteSport && (
                <p className="text-red-500 text-sm mt-2">{errors.favoriteSport}</p>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Favorite Team
              </label>
              <input
                type="text"
                value={formData.favoriteTeam}
                onChange={(e) => handleInputChange('favoriteTeam', e.target.value)}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.favoriteTeam ? 'border-red-500' : 'border-gray-200'
                  }`}
                placeholder="e.g., Mumbai Indians , Chennai Super Kings"
                autoFocus
              />
              {errors.favoriteTeam && (
                <p className="text-red-500 text-sm mt-2">{errors.favoriteTeam}</p>
              )}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Favorite Sport Player
              </label>
              <input
                type="text"
                value={formData.favoriteSportPlayer}
                onChange={(e) => handleInputChange('favoriteSportPlayer', e.target.value)}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.favoriteSportPlayer ? 'border-red-500' : 'border-gray-200'
                  }`}
                placeholder="e.g.,Virat Kohli, M S Dhoni..."
                autoFocus
              />
              {errors.favoriteSportPlayer && (
                <p className="text-red-500 text-sm mt-2">{errors.favoriteSportPlayer}</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSummaryField = (field, label, value, type = 'text') => {
    const isFieldEditing = isEditing[field];

    return (
      <div className="border-b border-gray-100 py-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm text-gray-600 font-medium">{label} : </span>
          <div style={{ display: 'flex', justifyContent: "space-between", paddingBottom: "10px" }}>
            <span className="text-sm">{value}</span>

            {!isFieldEditing && (
              <button
                onClick={() => handleEdit(field)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Edit2 size={16} />
              </button>
            )}
          </div>

        </div>

        {isFieldEditing ? (
          <div className="space-y-3">
            {type === 'select' && field === 'favoriteSport' ? (
              <input
                type="text"
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className={`w-full px-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors[field] ? 'border-red-500' : 'border-gray-200'
                  }`}
                placeholder="Enter your favorite sport"
                autoFocus
              />
            ) : type === 'select' && field === 'favoriteTeam' ? (
              <input
                type="text"
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className={`w-full px-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors[field] ? 'border-red-500' : 'border-gray-200'
                  }`}
                placeholder="Enter your favorite team"
                autoFocus
              />
            ) : type === 'select' && field === 'favoriteSportPlayer' ? (
              <input
                type="text"
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className={`w-full px-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors[field] ? 'border-red-500' : 'border-gray-200'
                  }`}
                placeholder="Enter your favorite sport player"
                autoFocus
              />
            ) : (
              <input
                type={type}
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className={`w-full px-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors[field] ? 'border-red-500' : 'border-gray-200'
                  }`}
                autoFocus
              />
            )}

            {errors[field] && (
              <p className="text-red-500 text-sm">{errors[field]}</p>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => handleSaveField(field)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                {/* <Check size={14} /> */}
                <span>Save</span>
              </button>
              <button
                onClick={() => setIsEditing(prev => ({ ...prev, [field]: false }))}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-900 font-medium">

          </div>
        )}
      </div>
    );
  };

  const renderSummary = () => (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="animate-slideUp bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-green-800">Success!</h3>
            </div>
          </div>
          <div className="text-center">
            <p className="text-green-700 font-medium mb-2">Registration Saved Successfully!</p>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Summary</h2>
        <p className="text-gray-600 text-sm">Review and edit your information below</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        {renderSummaryField('fullName', 'Full Name', formData.fullName, 'text')}
        {renderSummaryField('email', 'Email Address', formData.email, 'email')}
        {renderSummaryField('mobile', 'Mobile Number', formData.mobile, 'tel')}
        {renderSummaryField('city', 'City', formData.city, 'text')}
        {renderSummaryField('favoriteSport', 'Favorite Sport', formData.favoriteSport, 'select')}
        {renderSummaryField('favoriteTeam', 'Favorite Team', formData.favoriteTeam, 'select')}
        {renderSummaryField('favoriteSportPlayer', 'Favorite Sport Player', formData.favoriteSportPlayer, 'select')}
        {renderSummaryField('sportIcon', 'Sport Icon', formData.sportIcon, 'icons')}
      </div>

      <div className="pt-4">
        <button
          onClick={handleFinalSave}
          disabled={showSuccess}
          className={`w-full flex items-center justify-center space-x-2 py-4 rounded-xl font-medium transition-all ${showSuccess
              ? 'bg-blue-600 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
        >
          {showSuccess ? (
            <>
              {/* <Check size={20} /> */}
              <span>Saved Successfully!</span>
            </>
          ) : (
            <>
              <span>Save</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="progressive-form-container">
        <div className="form-wrapper">
          <div className="animate-slideUp">
            {renderSummary()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="progressive-form-container">
      <div className="form-wrapper">
        <div className="form-card">
          <div className="form-content">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Registration Form</h1>
            </div>
            <div key={currentStep} className="animate-slideUp">

              {renderStepContent()}
            </div>
          </div>

          <div className="form-navigation">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`button ${currentStep === 1 ? 'button-disabled' : 'button-secondary'}`}
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>


            <button
              onClick={handleNext}
              className="button button-primary"
            >
              <span>{currentStep === totalSteps ? 'Complete' : 'Next'}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressiveForm;