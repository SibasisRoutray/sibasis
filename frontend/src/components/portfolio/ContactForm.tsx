import React, { useState } from 'react';
import styled from 'styled-components';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
const URI = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch(`${URI}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to send message' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <form className="card" onSubmit={handleSubmit}>
          <div className="login">Contact Me</div>
          
          <div className="inputBox">
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
            />
            <span className="user">Name</span>
          </div>
          
          <div className="inputBox">
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <span>Email</span>
          </div>
          
          <div className="inputBox">
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required 
            />
            <span>Message</span>
          </div>
          
          <button 
            type="submit" 
            className="enter"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {status.type && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 16px;
  }

  .login {
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: block;
    font-weight: bold;
    font-size: xx-large;
    margin-bottom: 10px;
    text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  }

  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 500px;
    width: 100%;
    max-width: 500px;
    flex-direction: column;
    gap: 30px;
    background: rgba(10, 10, 10, 0.6);
    backdrop-filter: blur(20px);
    box-shadow: 0 10px 40px -10px rgba(5, 150, 105, 0.15);
    outline: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 16px;
    padding: 40px 35px;
  }

  .inputBox {
    position: relative;
    width: 100%;
    max-width: 400px;
  }

  .inputBox input,
  .inputBox textarea {
    width: 100%;
    padding: 14px 12px;
    outline: none;
    border: none;
    color: #fff;
    font-size: 1.1em;
    background: transparent;
    border-left: 2px solid rgba(16, 185, 129, 0.4);
    border-bottom: 2px solid rgba(16, 185, 129, 0.4);
    transition: 0.1s;
    border-bottom-left-radius: 8px;
    font-family: inherit;
  }

  .inputBox textarea {
    min-height: 120px;
    resize: vertical;
    border-bottom-left-radius: 8px;
  }

  .inputBox span {
    margin-top: 5px;
    position: absolute;
    left: 10px;
    transform: translateX(0) translateY(-4px);
    padding: 12px;
    pointer-events: none;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    letter-spacing: 3px;
    border-radius: 8px;
  }

  .inputBox input:valid~span,
  .inputBox input:focus~span,
  .inputBox textarea:valid~span,
  .inputBox textarea:focus~span {
    left: calc(100% - 10px);
    transform: translateX(-100%) translateY(-26px);
    font-size: 0.85em;
    padding: 4px 10px;
    background: #022C22;
    letter-spacing: 0.2em;
    color: #fff;
    outline: 1px solid rgba(16, 185, 129, 0.4);
    box-shadow: 0 0 10px rgba(5, 150, 105, 0.3);
  }

  .inputBox input:valid,
  .inputBox input:focus,
  .inputBox textarea:valid,
  .inputBox textarea:focus {
    border: 2px solid rgba(16, 185, 129, 0.8);
    border-radius: 8px;
    background: rgba(16, 185, 129, 0.05);
  }

  .enter {
    height: 55px;
    width: 160px;
    border-radius: 38px;
    border: 1px solid rgba(16, 185, 129, 0.5);
    cursor: pointer;
    background-color: rgba(5, 150, 105, 0.1);
    color: #fff;
    transition: 0.5s;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 2px;
    margin-top: 10px;
    font-weight: 600;
  }

  .enter:hover:not(:disabled) {
    background-color: #059669;
    box-shadow: 0 0 20px rgba(5, 150, 105, 0.4);
    color: white;
    transform: scale(1.05);
  }

  .enter:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .status-message {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    font-size: 14px;
    margin-top: -10px;
  }

  .status-message.success {
    background: rgba(16, 185, 129, 0.2);
    color: #34D399;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .status-message.error {
    background: rgba(239, 68, 68, 0.2);
    color: #F87171;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }

  /* Responsive */
  @media (max-width: 640px) {
    .card {
      min-height: 420px;
      padding: 25px 20px;
      gap: 25px;
      max-width: 100%;
    }
    
    .login {
      font-size: x-large;
    }
    
    .inputBox {
      max-width: 100%;
    }
    
    .inputBox input,
    .inputBox textarea {
      font-size: 1em;
      padding: 12px 10px;
    }
    
    .inputBox span {
      font-size: 12px;
      padding: 10px;
    }
    
    .inputBox input:valid~span,
    .inputBox input:focus~span,
    .inputBox textarea:valid~span,
    .inputBox textarea:focus~span {
      transform: translateX(-100%) translateY(-22px);
      font-size: 0.75em;
      padding: 4px 10px;
    }
    
    .enter {
      height: 48px;
      width: 140px;
      font-size: 11px;
    }
  }

  @media (max-width: 480px) {
    .card {
      min-height: 380px;
      padding: 20px 15px;
      gap: 20px;
    }
    
    .inputBox input,
    .inputBox textarea {
      font-size: 0.9em;
      padding: 10px 8px;
    }
    
    .inputBox span {
      font-size: 10px;
      padding: 8px;
    }
    
    .inputBox input:valid~span,
    .inputBox input:focus~span,
    .inputBox textarea:valid~span,
    .inputBox textarea:focus~span {
      transform: translateX(-100%) translateY(-20px);
      font-size: 0.7em;
      padding: 3px 8px;
    }
    
    .enter {
      height: 42px;
      width: 120px;
      font-size: 10px;
    }
  }
`;

export default ContactForm;