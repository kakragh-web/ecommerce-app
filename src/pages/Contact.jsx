import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <section id="contact" className="container my-5 py-5">
        <div className="container text-center mt-5 mb-5">
          <h3>Get In Touch</h3>
          <hr className="mx-auto" />
          <p className="w-50 mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="contact-form-container">
              <h4 className="mb-4">Send us a Message</h4>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="firstName" 
                      placeholder="First Name" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="lastName" 
                      placeholder="Last Name" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      placeholder="Email Address" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="phone" 
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <select 
                    className="form-control" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="order">Order Issue</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div className="mb-3">
                  <textarea 
                    className="form-control" 
                    id="message" 
                    rows="5" 
                    placeholder="Your Message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin me-2"></i>Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane me-2"></i>Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="contact-info">
              <h4 className="mb-4">Contact Information</h4>
              
              <div className="contact-item mb-4">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="contact-details">
                  <h6>Address</h6>
                  <p>1234 East Rand, Germiston<br />South Africa, 1401</p>
                </div>
              </div>
              
              <div className="contact-item mb-4">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-details">
                  <h6>Phone</h6>
                  <p>+27 123 456 7890<br />+27 987 654 3210</p>
                </div>
              </div>
              
              <div className="contact-item mb-4">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <h6>Email</h6>
                  <p>info@evalet.com<br />support@evalet.com</p>
                </div>
              </div>
              
              <div className="contact-item mb-4">
                <div className="contact-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="contact-details">
                  <h6>Business Hours</h6>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM<br />Sat - Sun: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
              
              <div className="social-links mt-4">
                <h6>Follow Us</h6>
                <div className="d-flex gap-3">
                  <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                  <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <div className="map-container">
              <h4 className="text-center mb-4">Find Us</h4>
              <div className="map-placeholder">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.7729!2d28.1621!3d-26.2041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEyJzE0LjgiUyAyOMKwMDknNDMuNiJF!5e0!3m2!1sen!2sza!4v1234567890" 
                  width="100%" 
                  height="300" 
                  style={{border: 0, borderRadius: '10px'}}
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <div className="faq-section">
              <h4 className="text-center mb-4">Frequently Asked Questions</h4>
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      What are your shipping options?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      We offer multiple shipping options including standard delivery (2-5 business days), express delivery (1-2 business days), and same-day delivery for selected areas.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      What is your return policy?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      We offer a 30-day return policy for all items in original condition. Returns are free for defective items, and a small fee applies for change of mind returns.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      Do you offer international shipping?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes, we ship internationally to over 50 countries. Shipping costs and delivery times vary by destination. Please check our shipping calculator at checkout.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;