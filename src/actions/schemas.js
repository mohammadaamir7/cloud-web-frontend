

// Detail about Organization
export function getOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Cyber-Sec Global LLC',
        description: 'Building secure cloud systems. Expert cybersecurity services: external/internal penetration testing, vulnerability scanning, web app testing, wireless testing, social engineering awareness. Protecting your data.',
        url: 'https://cybersecglobal.net/',
        logo: 'https://120mybucket.s3.amazonaws.com/images/logobutton%403x.png',       
        sameAs: [
            'https://www.youtube.com/@cybersecgloballlc',
            'https://twitter.com/cybersecglobal',
            'https://www.instagram.com/cybersecgloballlc/',
            'https://www.facebook.com/cybersecglobalLLC',
            'https://www.linkedin.com/company/cybersecgloballlc/',
            'https://www.pinterest.com/cybersecgloballlc/'
          ],
    };
}


// BreadCrumb for pages
export function getBreadcrumbSchema_HomePage() {

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://cybersecglobal.net"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "About Us",
                "item": "https://cybersecglobal.net/about-us"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Who We Are",
                "item": "https://cybersecglobal.net/who-we-are"
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Services",
                "item": "https://cybersecglobal.net/services"
            },
            {
                "@type": "ListItem",
                "position": 5,
                "name": "Login",
                "item": "https://cybersecglobal.net/login"
            },
            {
                "@type": "ListItem",
                "position": 6,
                "name": "Blog",
                "item": "https://cybersecglobal.net/blogs"
            }
        ]
    }
};

// BreadCrumb for About us page
export function getBreadcrumbSchema() {

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://cybersecglobal.net"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "About Us",
                "item": "https://cybersecglobal.net/about-us"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Who We Are",
                "item": "https://cybersecglobal.net/who-we-are"
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Services",
                "item": "https://cybersecglobal.net/services"
            },
            {
                "@type": "ListItem",
                "position": 5,
                "name": "Login",
                "item": "https://cybersecglobal.net/login"
            },
            {
                "@type": "ListItem",
                "position": 6,
                "name": "Blog",
                "item": "https://cybersecglobal.net/blogs"
            }
        ]
    }
};



// Team members Detail
export function getTeamMembersSchema(teamMembers) {
    const teamMembersSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Our Team Members",
      "itemListElement": []
    };
  
    teamMembers.forEach((member, index) => {
      const teamMemberSchema = {
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.jobTitle,
        "image": member.image,
        "description": member.description
      };
  
      teamMembersSchema.itemListElement.push({
        "@type": "ListItem",
        "position": index + 1,
        "item": teamMemberSchema
      });
    });
  
    return teamMembersSchema;
  }
  


// To explain list items of services 
export function servicesList(data) {
    const itemListElement = data.map((item, index) => {
      const listItems = item.points.map((point) => `<li>${point}</li>`).join("");
      return `
        {
          "@type": "Service",
          "name": "${item.title}",
          "description": "<ul>${listItems}</ul>"
        }
      `;
    }).join(",");
  
    return `
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Services/Practices",
        "description": "Explore our range of services and practices",
        "hasOfferCatalog": {
          "@type": "ItemList",
          "name": "Services and Practices Offered",
          "itemListElement": [${itemListElement}]
        }
      }
    `;
  }
  

// Contact Detail 
export function getContactPointSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ContactPoint",
        "telephone": "+1(347)886-3915",
        "email": "cybersecgloballlc@gmail.com"
    };
}


// To explain website 
export function getWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://cybersecglobal.net/",
        "name": "Cyber-Sec Global LLC",
        "description": "Building a strong foundation for secure cloud computing systems. Expert cybersecurity services: external/internal penetration testing, vulnerability scanning, web app testing, wireless testing, social engineering awareness.",
        "potentialAction": {
            "@type": "RegisterAction",
            "name": {
                "@language": "en-US",
                "@value": "Open an account with Cyber-Sec Global LLC"
            },
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://cybersecglobal.net/login",
                "inLanguage": "en-US",
                "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                ]
            }
        }
    };
}



// TO explain login feature of website 
export function getOpenAnAccountSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Action",
        "name": {
            "@language": "en-US",
            "@value": "Open an account, Cyber-Sec Global llc"
        },
        "description": {
            "@language": "en-US",
            "@value": "Get flexibility and control. Go beyond virtualization with multi-cloud services for cloud architecture, cloud management, security and networking."
        },
        "url": "https://cybersecglobal.net/login",
        "potentialAction": {
            "@type": "RegisterAction",
            "name": "Register",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://cybersecglobal.net/login",
                "inLanguage": "en-US",
                "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                ]
            }
        }
    };
}
