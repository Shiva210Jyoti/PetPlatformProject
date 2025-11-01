import React from "react";
import { Link } from "react-router-dom";
import developerPng from "./images/Dog.png";

const Contact = () => {
  const contactGroups = [
    {
      title: "Direct Contact",
      description: "Reach out instantly through email or a quick call.",
      items: [
        {
          icon: "fa-envelope",
          label: "Mail",
          value: "jyotishiva2104@gmail.com",
          href: "mailto:jyotishiva2104@gmail.com",
          type: "mailto"
        },
        {
          icon: "fa-phone",
          label: "Phone",
          value: "8627026538",
          href: "tel:8627026538",
          type: "phone"
        }
      ]
    },
    {
      title: "Connect Online",
      description: "Follow along and stay updated with my latest work.",
      items: [
        {
          icon: "fa-linkedin",
          label: "LinkedIn",
          value: "linkedin.com/in/shiva-jyoti-23013328b",
          href: "https://www.linkedin.com/in/shiva-jyoti-23013328b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          type: "external"
        },
        {
          icon: "fa-github",
          label: "GitHub",
          value: "github.com/Shiva210Jyoti",
          href: "https://github.com/Shiva210Jyoti",
          type: "external"
        }
      ]
    }
  ];

  const ContactLink = ({ item }) => {
    const content = (
      <>
        <div className="contact-link-icon" aria-hidden="true">
          <i className={`fa ${item.icon}`}></i>
        </div>
        <div className="contact-link-text">
          <span className="contact-link-label">{item.label}</span>
          <span className="contact-link-value">{item.value}</span>
        </div>
        {item.type === "external" && (
          <i className="fa fa-external-link contact-link-external" aria-hidden="true"></i>
        )}
      </>
    );

    if (item.type === "internal") {
      return (
        <Link
          to={item.href}
          className="contact-link-box contact-link-interactive"
          aria-label={`${item.label}: ${item.value}`}
        >
          {content}
        </Link>
      );
    }

    return (
      <a
        className="contact-link-box contact-link-interactive"
        href={item.href}
        aria-label={`${item.label}: ${item.value}`}
        {...(item.type === "external"
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    );
  };

  return (
    <div className="contactUs-wrapper">
    <div className="contactUs-main-container">
      <div className="contactUs-left-para">
        <h2>📬 Let's Get in Touch</h2>
        <p style={{ marginBottom: "2rem", fontStyle: "italic" }}>
          I’m always open to discussing new opportunities, creative ideas, or collaborations!
        </p>

          {contactGroups.map((group) => (
            <div className="contact-info-section" key={group.title}>
              <h3 className="contact-section-heading">{group.title}</h3>
              <p className="contact-section-description">{group.description}</p>
              <div className="contact-section-items">
                {group.items.map((item) => (
                  <ContactLink item={item} key={`${group.title}-${item.label}`} />
                ))}
              </div>
            </div>
          ))}
      </div>

      <div className="contactUs-pic">
        <img src={developerPng} alt="Dog illustration" />
      </div>
    </div>
    </div>
  );
};

export default Contact;
