import {
  LuHouse,
  LuCompass,
  LuMessageSquare,
  LuPresentation,
  LuPlus,
  LuUser,
  LuCog,
} from "react-icons/lu";

const SIDEBAR_USER = [
  {
    key: "home",
    label: "Home",
    href: "/home",
    icon: <LuHouse />,
  },
  {
    key: "discover",
    label: "Discover",
    href: "/discover",
    icon: <LuCompass />,
  },
  {
    key: "messages",
    label: "Messages",
    href: "/messages",
    icon: <LuMessageSquare />,
  },
  {
    key: "miniClass",
    label: "Mini Class",
    href: "/mini-class",
    icon: <LuPresentation />,
  },
  {
    key: "createPost",
    label: "Create Post",
    href: "/create-post",
    icon: <LuPlus />,
  },
  {
    key: "profile",
    label: "Profile",
    href: "/profile",
    icon: <LuUser />,
  },
  {
    key: "settings",
    label: "Settings",
    href: "/settings",
    icon: <LuCog />,
  },
];

export { SIDEBAR_USER };
