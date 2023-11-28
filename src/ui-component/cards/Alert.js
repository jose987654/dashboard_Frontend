import React from 'react';
import PropTypes from 'prop-types';

export default function Alert({ text, success, error, linkText, href }) {
  const rootStyles = {
    borderRadius: '0.25rem',
    padding: '1rem',
    fontSize: '15px',
    marginBottom: '1rem',
    ...(success && {
      color: '#059669',
      backgroundColor: '#C6F6D5',
      borderColor: '#34D399'
    }),
    ...(error && {
      color: '#DC2626',
      backgroundColor: '#FEE2E2',
      borderColor: '#F87171'
    })
  };

  const textStyle = {
    marginLeft: '0.75rem',
    ...(success && { color: '#059669' }),
    ...(error && { color: '#DC2626' })
  };

  const linkStyle = {
    fontWeight: '500',
    textDecoration: 'underline',
    cursor: 'pointer'
  };

  return (
    <div style={rootStyles}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {(success || error) && (
          <p style={textStyle}>
            {text}{' '}
            <a href={href} style={linkStyle}>
              {linkText}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

Alert.propTypes = {
  text: PropTypes.string.isRequired,
  success: PropTypes.bool,
  error: PropTypes.bool,
  linkText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};
