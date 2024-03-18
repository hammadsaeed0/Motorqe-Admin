const menu = [
  {
    heading: "Admin Dashboard",
  },
  {
    icon: "cart-fill",
    text: "Dashboard",
    link: "/dashboard", 
  },

  {
    heading: "Admin Control",
  },
  {
    icon: "users-fill",
    text: "User Manage",
    active: false,
    subMenu: [
      {
        text: "Add User",
        link: "/add-user",
      },
      // {
      //   text: "User List",
      //   link: "/user-list",
      // },
      {
        text: "User List",
        link: "/user-list",
      },
    ],
  },
  {
    icon: "focus",
    text: "Garage",
    link: "/garage",
    active: false,
   
  },
  {
    icon: "focus",
    text: "Listing Details",
    link: "/carListingDetails",
    active: false,
   
  },
  {
    icon: "focus",
    text: "Cars",
    link: "/car-list",
    active: false,
   
  },
  {
    icon: "focus",
    text: "News",
    link: "/add-news",
    active: false,
   
  },
  // {
  //   icon: "focus",
  //   text: "Garage Booking",
  //   link: "/booking_garge_list",
  //   active: false,
   
  // },

  // {
  //   icon: "grid-fill",
  //   text: "Audition",
  //   active: false,
  //   subMenu: [
     
  //     {
  //       text: "Upload Songs",
  //       link: "/add-karaoke",
  //     },
  //     {
  //       text: "Song list",
  //       link: "/songslist",
  //     },
  //   ],
  // },
  // {
  //   icon: "menu-alt-left",
  //   text: "Audition",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Audition Information",
  //       link: "/audition",
  //     },
  //   ],
  // },
  // {
  //   icon: "chat-circle  ",
  //   text: "News",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Add News",
  //       link: "/add-news",
  //     },
  //     {
  //       text: "Manage News",
  //       link: "/news-list",
  //     },
  //   ],
  // },

  // {
  //   icon: "emails-fill",
  //   text: "Emails",
  //   active: false,
  //   subMenu: [
  //     // {
  //     //   text: "Contact",
  //     //   link: "/contact",
  //     // },
  //     {
  //       text: "Mass Email",
  //       link: "/send-email",
  //     },
  //     {
  //       text: "Single Email",
  //       link: "/single-email",
  //     },
  //     {
  //       text: "Inbox",
  //       link: "/mass-email",
  //     },

  //   ],
  // },

  // {
  //   icon: "emails-fill",
  //   text: "Admin",
  //   active: false,
  //   subMenu: [
  //     // {
  //     //   text: "Contact",
  //     //   link: "/contact",
  //     // },
  //     {
  //       text: "Admin List",
  //       link: "/admin-list",
  //     },
   
  //   ],
  // },
  // {
  //   icon: "light-fill",
  //   text: "Auth Pages",
  //   active: false,
  //   subMenu: [
  //     {
  //       text: "Login / Signin",
  //       link: "/auth-login",
  //       newTab: true,
  //     },
  //     {
  //       text: "Register / Signup",
  //       link: "/auth-register",
  //       newTab: true,
  //     },
  //     {
  //       text: "Forgot Password",
  //       link: "/auth-reset",
  //       newTab: true,
  //     },
  //     {
  //       text: "Success / Confirm",
  //       link: "/auth-success",
  //       newTab: true,
  //     },
  //   ],
  // },
];
export default menu;
