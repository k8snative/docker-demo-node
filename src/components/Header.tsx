import arrowRightRed from "../../public/assets/arrowRightRed.png";
import LinkIcon from "../../public/assets/linkIcon.svg";
import autoDropdown from "../../public/assets/autoDropdown.svg";
import bigLogo from "../../public/assets/bigLogo.png";
import burger from "../../public/assets/burger.png";
import burgerSearch from "../../public/assets/burgerSearch.png";
import downSideArrow from "../../public/assets/downSidearrow.svg";
import dropDownIconRed from "../../public/assets/dropDownIconRed.png";
import facebook from "../../public/assets/facebook.png";
import faq from "../../public/assets/faq.svg";
import healthDropdown from "../../public/assets/healthDropdown.svg";
import insta from "../../public/assets/insta.png";
import lifeDropdown from "../../public/assets/lifeDropdown.svg";
import linkedIn from "../../public/assets/linkedIn.png";
import logo from "../../public/assets/logo.png";
import companyLogo from "../../public/assets/logoImage.svg";
import logoutIcon from "../../public/assets/logout.svg";
import MinusIcon from "../../public/assets/minusIcon.svg";
import Phone from "../../public/assets/phone.png";
import PlusIcon from "../../public/assets/plusIcon.svg";
import profilePicture from "../../public/assets/profilePicture.png";
import redsearchIcon from "../../public/assets/redsearchicon.png";
import Representative from "../../public/assets/representive.svg";
import rightIconGrey from "../../public/assets/rightIconGrey.png";
import searchIcon from "../../public/assets/searchIcon.png";
import searchSubIcon from "../../public/assets/searchSubIcon.png";
import threeDots from "../../public/assets/threeDots.png";
import travelDropdown from "../../public/assets/travelDropdown.svg";
import upSideArrow from "../../public/assets/upSideArrow.svg";
import LoginUser from "../../public/assets/userLogin.svg";
import watch from "../../public/assets/watch.png";
import styles from "../styles/Header.module.scss";
import CustomDropdown from "./CustomDropDown/CustomDropdown";
import SignInUpButton from "./SignInUpButton/SignInUpButton";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import MediaQuery from "react-responsive";
import Api from "src/lib/api";
import { store } from "src/lib/redux";
import { logout, logout as logoutRedux } from "src/lib/redux/auth/action";
import { getCookie } from "src/lib/utils";
import email from "~public/assets/email.png";

const menuItems = [
  { label: "Auto Takaful", route: "/auto" },
  { label: "Health Takaful", route: "/health" },
  { label: "Family Takaful", route: "/family" },
  { label: "Travel Takaful", route: "/travel" },
];

const claimMenuItems = [
  {
    route: "/auto/claims",
    label: "Auto",
  },
  {
    route: "/health/claims",
    label: "Health",
  },
  {
    route: "/family/claims",
    label: "Family",
  },
  {
    route: "/travel/claims",
    label: "Travel",
  },
];

const HeaderTopContainer = ({ navSearch }: { navSearch: any }) => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | KeyboardEvent) {
      if (!searchBarOpen) {
        return;
      }
      if ("keyCode" in event && event.keyCode === 27) {
        setSearchBarOpen(false);
      }
      const targetElement =
        window &&
        (window.document.getElementsByClassName(
          styles["navSearchContainer"] || ""
        )[0] as HTMLElement);

      if (!targetElement.contains(event.target as HTMLElement)) {
        setSearchBarOpen(false);
      }
      const targetElementForDropDown =
        window &&
        (window.document.getElementsByClassName(
          styles["profPicDropDownMenuContainer"] || ""
        )[0] as HTMLElement);
      if (!targetElementForDropDown?.contains(event.target as HTMLElement)) {
        false;
      }
    }

    // Bind the event listener
    document.addEventListener("keydown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("keydown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      <div className={styles["topContainer"]}>
        <Link href={"/faq"}>
          <p className={styles["topHeaderTxt"]}> FAQ&apos;s</p>
        </Link>
        <Link href={"/contactUs"}>
          <p className={styles["topHeaderTxt"]}>Contact Us</p>
        </Link>
        <p className={styles["topHeaderTxt"]}>|</p>
        <div
          className={styles["topHeaderImgContainer"]}
          onClick={() => {
            if (!searchBarOpen) setSearchBarOpen(true);
          }}
        >
          <Image
            width={"20px"}
            height={"20px"}
            src={searchBarOpen ? redsearchIcon : searchIcon}
            alt=""
          />
        </div>
        <div
          id="nav-search"
          className={styles[searchBarOpen ? "navSearchContainer" : "hide"]}
          style={{ display: navSearch }}
        >
          <div className={styles["navSearch"]}>
            <input
              type={"text"}
              placeholder="Search"
              className={styles["navInput"]}
            />
            <div className={styles["searchSubIconContainer"]}>
              <Image
                width={"25px"}
                height={"25px"}
                src={searchSubIcon}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const NavBarContainer = ({ user }: any) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const dispatch = useDispatch();

  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  const handleLogout = async () => {
    setButtonClicked(true);
    await Api("GET", "customer/logout").then((response: any) => {
      if (response.success) {
        setButtonClicked(false);
        router.replace("/auth").then(() => {
          dispatch(logoutRedux());
        });
      } else {
        router.push({ pathname: "/auth" });
      }
    });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | KeyboardEvent) {
      if (!profileOpen) {
        return;
      }
      if ("keyCode" in event && event.keyCode === 27) {
        setProfileOpen(false);
      }
      const targetElementForDropDown =
        window &&
        (window.document?.getElementsByClassName(
          styles["profPicDropDownMenuContainer"] || ""
        )[0] as HTMLElement);
      if (!targetElementForDropDown?.contains(event.target as HTMLElement)) {
        setProfileOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("keydown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("keydown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent | KeyboardEvent) {
  //     if ('keyCode' in event && event.keyCode === 27) {
  //       setProfileOpen(false)
  //     }
  //     if ((event.target as HTMLElement).id !== 'profPicDropDownMenuContainer') {
  //       setProfileOpen(false)
  //     }
  //   }

  //   // Bind the event listener
  //   document.addEventListener('keydown', handleClickOutside)
  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => {
  //     // Unbind the event listener on clean up
  //     document.removeEventListener('keydown', handleClickOutside)
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // })
  const router = useRouter();

  return (
    <div className={`${styles["navBarContainer"]}`} style={{ borderBottom: 0 }}>
      <div className={styles["navBarLeftContainer"]}>
        <Link href="/">
          <Image
            priority={true}
            width={"154px"}
            height={"50.4px"}
            src={logo}
            alt=""
          />
        </Link>
      </div>
      <div className={styles["navBarRightContainerHandler"]}>
        <div
          className={`justify-align-center align-items-center ${styles["navBarOptions"]}`}
        >
          <div className={styles["navOption"]}>
            <Link href="/aboutUs" className={styles["cursorPointer"]}>
              <p className={styles["navOptionTxt"]}>About Us</p>
            </Link>
          </div>
          {/* <div id="nav" className={styles['navOption']}>
            <CustomDropdown navtxt={'About'} />
          </div> */}
          <div id="nav" className={styles["navOption"]}>
            <CustomDropdown
              navtxt={"Products"}
              options={true}
              navItems={[
                {
                  link: "/auto",
                  name: "Auto Takaful",
                  icon: autoDropdown,
                },
                {
                  link: "/travel",
                  name: "Travel Takaful",
                  icon: travelDropdown,
                },
                {
                  link: "/health",
                  name: "Health Takaful",
                  icon: healthDropdown,
                },
                {
                  link: "/family",
                  name: "Family Takaful",
                  icon: lifeDropdown,
                },
              ]}
            />
          </div>
          <div id="nav" className={styles["navOption"]}>
            <CustomDropdown
              navtxt={"Claims"}
              options={true}
              navItems={[
                {
                  link: "/auto/claims",
                  name: "Auto Claim",
                  icon: autoDropdown,
                },
                {
                  link: "/travel",
                  name: "Travel Claim",
                  icon: travelDropdown,
                },
                {
                  link: "/health",
                  name: "Health Claim",
                  icon: healthDropdown,
                },
                {
                  link: "/family",
                  name: "Family Claim",
                  icon: lifeDropdown,
                },

                // {
                //   link: '/auto/claims',
                //   name: 'Auto',
                // },
                // {
                //   link: '/health/claims',
                //   name: 'Health',
                // },
                // {
                //   link: '/life/claims',
                //   name: 'Life',
                // },
                // {
                //   link: '/travel/claims',
                //   name: 'Travel',

                // },
              ]}
            />
          </div>
          <div className={styles["navOption"]}>
            <Link href="/faq?tab=0" className={styles["cursorPointer"]}>
              <p className={styles["navOptionTxt"]}>FAQs</p>
            </Link>
          </div>
          {/* <div className={styles['navOption']}>
            <p className={styles['navOptionTxt']}>Renewals</p>
          </div> */}
          {/* <div className={styles['navOption']}>
            <Link href="/blogs" className={styles['cursorPointer']}><p className={styles['navOptionTxt']}>Blogs</p></Link>
          </div> */}
          {/* <div className={styles['navBarSeparator']} /> */}
        </div>
        <a href="/contactUs" className="contactUsBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15.353"
            height="14.43"
            viewBox="0 0 15.353 14.43"
          >
            <g
              id="Group_31898"
              data-name="Group 31898"
              transform="translate(-855.2 -718.198)"
            >
              <path
                id="Path_1085"
                data-name="Path 1085"
                d="M863.032,730.771c.239,0,.479.009.718,0a.907.907,0,0,1,.888.51.152.152,0,0,0,.158.092c.334,0,.669.016,1-.005a1.873,1.873,0,0,0,1.729-1.022,4.265,4.265,0,0,0,.223-.782c.005-.02-.029-.063-.055-.077a.952.952,0,0,1-.542-.919c.005-1.516,0-3.032,0-4.547a.855.855,0,0,1,.441-.78c.1-.06.122-.1.105-.223a4.581,4.581,0,0,0-.546-1.628,5.194,5.194,0,0,0-.7-.974,4.657,4.657,0,0,0-1.347-1.029,4.9,4.9,0,0,0-4.276-.083,4.924,4.924,0,0,0-2.714,3.326,4.131,4.131,0,0,0-.085.459.158.158,0,0,0,.073.121.912.912,0,0,1,.491.858c0,1.531,0,3.061,0,4.592a.9.9,0,0,1-.8.889.923.923,0,0,1-1-.564.168.168,0,0,0-.1-.068,2.055,2.055,0,0,1-1.226-1.208,3.514,3.514,0,0,1-.252-1.778,2.8,2.8,0,0,1,.612-1.588,1.5,1.5,0,0,1,.771-.543.411.411,0,0,0,.261-.231.628.628,0,0,1,.26-.292c.234-.085.279-.251.306-.459a5.076,5.076,0,0,1,.4-1.354,5.236,5.236,0,0,1,1.132-1.65,5.568,5.568,0,0,1,4.266-1.6,5.538,5.538,0,0,1,3.824,1.886,5.08,5.08,0,0,1,1.055,1.843c.11.352.163.721.251,1.08a.271.271,0,0,0,.121.164.9.9,0,0,1,.458.459.228.228,0,0,0,.12.117,2.046,2.046,0,0,1,1.307,1.4,3.511,3.511,0,0,1,.169,1.56,2.628,2.628,0,0,1-.851,1.832,2.259,2.259,0,0,1-.523.314.435.435,0,0,0-.256.2.9.9,0,0,1-.439.419.173.173,0,0,0-.076.119,2.48,2.48,0,0,1-1.041,1.92,2.338,2.338,0,0,1-1.166.435c-.459.036-.92.048-1.38.06a.193.193,0,0,0-.191.121.869.869,0,0,1-.776.478c-.519.011-1.038,0-1.557,0a.956.956,0,0,1-.935-.788.926.926,0,0,1,.914-1.071C862.512,730.784,862.772,730.771,863.032,730.771Zm-5.666-4.458v.986c0,.424,0,.847,0,1.27a.359.359,0,0,0,.216.337.251.251,0,0,0,.308-.117.565.565,0,0,0,.071-.275q.006-2.182,0-4.363a.7.7,0,0,0,0-.09c-.032-.245-.223-.38-.417-.287a.33.33,0,0,0-.181.328Q857.367,725.207,857.366,726.313Zm11.018.032v-.867c0-.463,0-.927,0-1.389a.306.306,0,0,0-.431-.31.38.38,0,0,0-.17.369q0,2.181,0,4.363a.639.639,0,0,0,0,.09.341.341,0,0,0,.232.309.25.25,0,0,0,.293-.123.5.5,0,0,0,.069-.246C868.386,727.809,868.384,727.077,868.384,726.345Zm-11.65-1.9a.71.71,0,0,0-.1.044,1.466,1.466,0,0,0-.493.558,2.776,2.776,0,0,0-.282,1.623,2.483,2.483,0,0,0,.4,1.134,1.014,1.014,0,0,0,.475.419Zm12.283,3.79a1.365,1.365,0,0,0,.562-.564,2.791,2.791,0,0,0,.307-1.69,2.416,2.416,0,0,0-.431-1.165,3.049,3.049,0,0,0-.406-.39l-.032.031Zm-5.987,3.169c-.254,0-.508,0-.762,0a.305.305,0,0,0-.291.26.262.262,0,0,0,.18.29.629.629,0,0,0,.228.046q.643.006,1.286,0a.664.664,0,0,0,.255-.052.28.28,0,0,0,.143-.335.289.289,0,0,0-.29-.207C863.529,731.394,863.28,731.4,863.031,731.4Z"
                transform="translate(0 0)"
                fill="#2d2d2d"
              />
            </g>
          </svg>
          Contact Us
        </a>
        {/* <div className={`${styles['navBarRightSubLeftContainer']}`}>
          <div className={styles['subLeftContainerSub']}>
            <p className={styles['teamtb']}>t</p>
            <p className={styles['teamtb']}>e</p>
            <p className={styles['teamtb']}>a</p>
            <p className={styles['teamtb']}>m</p>
            <p className={styles['teamtb']}>t</p>
            <p className={styles['teamtb']}>b</p>
          </div>
          <p className={styles['uan']}>UAN: 111-832-682</p>
        </div> */}
        {user ? (
          <div
            className={styles["navBarRightSubRightContainerSignedIn"]}
            onClick={() => {
              setProfileOpen(!profileOpen);
            }}
          >
            {user && user?.profile_image_path ? (
              <div className={`${styles["profilePictureContainer"]}`}>
                <Image
                  alt=""
                  src={`${process.env["NEXT_PUBLIC_IMAGE_ORIGIN"]}${user?.profile_image_path}`}
                  width={"100%"}
                  height={"100%"}
                  objectFit={"cover"}
                />
              </div>
            ) : (
              <div className={styles["profilePictureContainer"]}>
                <Image priority={true} src={profilePicture} alt="" />
              </div>
            )}
            <p
              className={styles["profileTxt"]}
            >{`${user?.first_name} ${user?.last_name}`}</p>
            <div className={styles["profPicDropDownContainer"]}>
              {/* <Image
                priority={true}
                src={downSideArrow}
                className={`${profileOpen ? styles['rotate'] : styles['default']}`}
                alt=""
              /> */}
            </div>
            {/* ------ Profile Drop Down ------ */}
            <div
              className={
                styles[profileOpen ? "profPicDropDownMenuContainer" : "hide"]
              }
            >
              <div className={styles["profileMenuRowEmpty"]}></div>
              <div className={styles["profilerows"]}>
                <div
                  onClick={async () => {
                    try {
                      const apiOrigin = process.env["NEXT_PUBLIC_API_ORIGIN"];
                      const state = store.getState();
                      const { user } = state?.auth?.data || {};
                      let token = "";
                      if (user) {
                        token = `Bearer ${user["accessToken"]}`;
                      }
                      if (user) {
                        const response = await fetch(
                          `${apiOrigin}customer/check_validation`,
                          {
                            method: "GET",
                            headers: {
                              ...{ "Content-Type": "application/json" },
                              Authorization: token,
                            },
                          }
                        );

                        if (
                          response.status === 503 ||
                          response.status === 401 ||
                          response.status === 400
                        ) {
                          store.dispatch(logout());
                          Router.push("/auth");
                        } else {
                          window.open(
                            `${process.env["NEXT_PUBLIC_DASHBOARD_ORIGIN"]}/dashboard`
                          );
                        }
                      } else {
                      }
                    } catch (error) {
                      console.log(error);
                    }
                    //window.open(`http://localhost:3001/dashboard`)
                  }}
                  className={styles["profileMenuRowOne"]}
                >
                  <div className={styles["profileMenuRowIcon"]}>
                    <Image
                      priority={true}
                      width={"18px"}
                      height={"16px"}
                      src={watch}
                      alt=""
                    />
                  </div>
                  <p className={styles["profileTxt"]}>My Dashboard</p>
                </div>
                <div
                  onClick={async () => {
                    Router.push("/faq");
                  }}
                  className={styles["profileMenuRowTwo"]}
                >
                  <div className={styles["profileMenuRowIcon"]}>
                    <Image
                      priority={true}
                      width={"15px"}
                      height={"15px"}
                      src={faq}
                      alt=""
                    />
                  </div>
                  <p className={styles["profileTxt"]}>FAQs</p>
                </div>
                <div
                  onClick={
                    buttonClicked
                      ? () => {}
                      : (event) => {
                          event.stopPropagation();
                          handleLogout();
                        }
                  }
                  className={styles["profileMenuRowTwo"]}
                >
                  <div className={styles["profileMenuRowIcon"]}>
                    <Image
                      priority={true}
                      width={"11px"}
                      height={"15px"}
                      src={logoutIcon}
                      alt=""
                    />
                  </div>
                  <p className={styles["profileTxt"]}>logout</p>
                </div>
                {/* <div className={styles['profileMenuRow']}>
                  <div className={styles['profileMenuItem']}>
                    <div className={styles['profileMenuRowIcon']}>
                      <Image width={'20px'} height={'20px'} src={Phone} alt="" />
                    </div>
                    <p className={styles['profileMenuTxt']}>UAN: 111-832-682</p>
                  </div>
                  <div className={styles['profileMenuItem']}>
                    <div className={styles['profileMenuRowIcon']}>
                      <Image priority={true} width={'18px'} height={'18px'} src={email} alt="" />
                    </div>
                    <p className={styles['profileMenuTxt']}>Hello@takafulbazaar.pk</p>
                  </div>
                  <div className={styles['profileSeparator']}></div>
                  <div
                    onClick={
                      buttonClicked
                        ? () => { }
                        : event => {
                          event.stopPropagation()
                          handleLogout()
                        }
                    }
                    className={styles['profileMenuItem']}
                  >
                    <div className={styles['profileMenuRowIcon']}>
                      <Image priority={true} width={'19px'} height={'17px'} src={watch} alt="" />
                    </div>
                    <p className={styles['profileTxt']}>Logout</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles["navBarRightSubRightContainerSignedOut"]}>
            <SignInUpButton
              link={"/auth"}
              btnTxt="Sign in / Sign up"
              onClick={() => {}}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const BurgerMenuItems = ({
  title,
  items,
  link,
  onlyTitle,
}: {
  title: string;
  items?: Array<{ label: string; route: string }>;
  link?: string;
  onlyTitle?: boolean;
}) => {
  const [isMenuCollapsed, setMenuCollapsed] = useState(true);
  const router = useRouter();

  return onlyTitle ? (
    <div className={styles["BurgerMenuItems"]}>
      <div
        className={styles["BurgerMenuItemContainer"]}
        onClick={() => {
          if (items?.length) setMenuCollapsed(!isMenuCollapsed);
        }}
      >
        <Link href={link}>
          <p className={styles["BurgerMenuRightTxt"]}>{title}</p>
        </Link>
        <div className={styles["BurgerMenuRightImgContainer"]}>
          <div className="mr-2">
            <Image src={LinkIcon} />
          </div>
          {/* {isMenuCollapsed && items?.length ? (
            <Image priority={true} src={downSideArrow} width={15} height={8} alt="" />
          ) : (
            <Image priority={true} src={upSideArrow} width={15} height={8} alt="" />
          )} */}
        </div>
      </div>
    </div>
  ) : (
    <div
      // style={{border:'1px solid'}}
      className={styles["BurgerMenuItems"]}
    >
      <div
        className={styles["BurgerMenuItemContainer"]}
        onClick={() => {
          if (items?.length) setMenuCollapsed(!isMenuCollapsed);
        }}
      >
        <p className={styles["BurgerMenuRightTxt"]}>{title}</p>
        <div className={styles["BurgerMenuRightImgContainer"]}>
          <div>
            <Image src={isMenuCollapsed ? MinusIcon : PlusIcon} />
          </div>
          {/* {upSideArrow.svg} */}
          {/* {isMenuCollapsed && items?.length ? (
            <Image priority={true} src={downSideArrow} width={15} height={8} alt="" />
          ) : (
            <Image priority={true} src={upSideArrow} width={15} height={8} alt="" />
          )} */}
        </div>
      </div>
      <div className={styles[isMenuCollapsed ? "isMenuCollapsed" : "hide"]}>
        {items?.map((item: { label: string; route: string }, index: number) => (
          <div className={styles["menuEachItem"]} key={index}>
            {
              <p
                className={styles["menuEachTxt"]}
                onClick={() => {
                  if (item?.route.length) {
                    router.push(item?.route);
                  }
                }}
              >
                {item.label}
              </p>
            }
            {/* <div className={styles['BurgerMenuRightImgContainerGrey']}>
              <Image priority={true} src={rightIconGrey} alt="" />
            </div> */}
          </div>
        ))}
      </div>
      {/* <div className={styles['separator']} /> */}
    </div>
  );
};

const BurgerContainer = ({ user }: { user: any }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  const handleLogout = async () => {
    setButtonClicked(true);
    await Api("GET", "customer/logout").then((response: any) => {
      if (response.success) {
        setButtonClicked(false);
        router.replace("/auth").then(() => {
          dispatch(logoutRedux());
        });
      } else {
        router.push({ pathname: "/auth" });
      }
    });
  };

  return (
    <div className={styles["burgerContainerMain"]}>
      <div className={styles["burgerContainerSub"]}>
        <div className={styles["burgerContainer"]}>
          {user ? (
            <div className={`${styles["burgerProfImgContainer"]}`}>
              <Image
                alt=""
                //  src={bigLogo}
                src={LoginUser}
              />
            </div>
          ) : (
            <div className={`${styles["burgerProfImgContainerServer"]}`}>
              <Image
                alt=""
                // src={`${process.env["NEXT_PUBLIC_IMAGE_ORIGIN"]}${user?.profile_image_path}`}
                src={companyLogo}
                width={"100%"}
                height={"100%"}
                objectFit={"contain"}
              />
            </div>
          )}
          <div
            className={`${"justify-content-start"} ${
              styles["burgerProfiletxtContain"]
            }`}
          >
            {user ? (
              <>
                <div className="d-flex align-items-center">
                  <div className={styles["profileContainer"]}>
                    <p
                      className={styles["burgerProfileName"]}
                    >{`${user?.first_name} `}</p>
                    <p
                      onClick={buttonClicked ? () => {} : handleLogout}
                      className={styles["burgerLogoutTxtDashboard"]}
                    >
                      Logout
                    </p>
                  </div>
                  <div
                    onClick={() =>
                      window.open(
                        `${process.env["NEXT_PUBLIC_DASHBOARD_ORIGIN"]}dashboard`
                      )
                    }
                    className={styles["logOutBtn"]}
                  >
                    <p className={styles["logOutBtnTxt"]}>Dashboard</p>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles["navBarRightSubRightContainerSignedOut"]}>
                <SignInUpButton
                  link={"/auth"}
                  btnTxt="Sign in / Sign up"
                  onClick={() => {}}
                />
              </div>
            )}
          </div>
        </div>
        {/* <div className={styles["burgerContainer"]}>
          <div className={styles["burgerSearchContainer"]}>
            <div className={styles["burgerImgContainer"]}>
              <Image
                priority={true}
                width={"100%"}
                height={"100%"}
                src={burgerSearch}
                alt=""
              />
            </div>
            <input
              type={"text"}
              placeholder="Search"
              className={styles["burgerInput"]}
            />
            <div className={styles["burgerImgDotContainer"]}>
              <Image
                priority={true}
                className={styles["burgerDotImg"]}
                width={"100%"}
                height={"100%"}
                src={threeDots}
                alt=""
              />
            </div>
          </div>
        </div> */}
        <div className={styles["burgerContainer"]}>
          <div className={styles["burgerBottomContainer"]}>
            <p className={styles["burgerMenuHeading"]} onClick={() => {}}>
              {/* TAKAFUL BAZAAR */}
            </p>
            <BurgerMenuItems title="About Us" link="/aboutUs" onlyTitle />
            <BurgerMenuItems title="Products" items={menuItems} />
            <BurgerMenuItems title="Claims" items={claimMenuItems} />
            {/* <BurgerMenuItems title="Renewals" /> */}
            <BurgerMenuItems title="FAQs" link="/faq" onlyTitle />
            <BurgerMenuItems title="Contact Us" link="/contactUs" onlyTitle />
          </div>
        </div>
        <div className={styles["burgerContainerLowest"]}>
          <Link href={`mailto:hello@takafulbazaar.pk`}>
            <div
              className={`d-flex d-flex align-items-center justify-content-space ${styles["menuFooters"]}`}
            >
              <div className={styles["menuLowerImg"]}>
                <Image src={Representative} width={30} height={30} />
              </div>
              <div className={styles[""]}>
                <p className={styles["footerUpper"]}>General Enqueries</p>
                <p className={styles["footerLower"]}>Hello@takafulbazaar.pk</p>
              </div>
            </div>
          </Link>
          {/* <Link href={`tel:111832682`}> */}
          <div
            className={`d-flex d-flex align-items-center justify-content-space ${styles["menuFooters"]}`}
          >
            <div className={styles["menuLowerImg"]}>
              <Image src={Representative} width={30} height={30} />
            </div>
            <div className={styles[""]}>
              <p className={styles["footerUpper"]}>Contact Customer Services</p>
              <p className={styles["footerLower"]}>UAN : 111-832-682</p>
            </div>
          </div>
          {/* </Link> */}
        </div>
        {/* <div className={styles["burgerContainerLowest"]}>
          {!user ? (
            <div className="w-100 my-4">
              <SignInUpButton
                link={"/auth"}
                btnTxt="Sign in / Sign up"
                onClick={() => {}}
              />
            </div>
          ) : (
            <div
              onClick={buttonClicked ? () => {} : handleLogout}
              className={styles["logOutBtn"]}
            >
              <h1 className={styles["logOutBtnTxt"]}>Logout</h1>
            </div>
          )}
        </div> */}
        {/* <div className={styles["burgerContainerLowestImg"]}> */}
        {/* <div className={styles["burgerLogoimg"]}>
            <Image
              priority={true}
              width={"100%"}
              height={"100%"}
              src={bigLogo}
              alt=""
            />
          </div> */}
        {/* <div className={styles["icons"]}> */}
        {/* <div className={styles["burgerImgSocialContainer"]}>
              <div className={styles["burgerImgSocial"]}>
                <Image
                  priority={true}
                  width={"100%"}
                  height={"100%"}
                  src={facebook}
                  alt=""
                />
              </div>
              <div className={styles["burgerImgSocial"]}>
                <Image
                  priority={true}
                  width={"100%"}
                  height={"100%"}
                  src={insta}
                  alt=""
                />
              </div>
              <div className={styles["burgerImgSocial"]}>
                <Image
                  priority={true}
                  width={"100%"}
                  height={"100%"}
                  src={linkedIn}
                  alt=""
                />
              </div>
            </div> */}

        {/* <div className={styles["burgerContainerLowestTxt"]}>
              <p className={styles["lowerTxt"]}>About Us</p>
              <p className={styles["lowerTxt"]}>|</p>
              <Link href={"/contactUs"}>
                <p className={styles["lowerTxt"]}>Contact Us</p>
              </Link>
              <p className={styles["lowerTxt"]}>|</p>
              <Link href={"/faq"}>
                <p className={styles["lowerTxt"]}>FAQs</p>
              </Link>
            </div> */}
        {/* </div> */}
        {/* </div> */}

        {/* <div className={styles['burgerContainerLowestImg']}>
          <div className={styles['burgerLogoimg']}>
            <Image priority={true} width={'100%'} height={'100%'} src={bigLogo} alt="" />
          </div>
          <div className={styles['burgerImgSocialContainer']}>
            <div className={styles['burgerImgSocial']}>
              <Image priority={true} width={'100%'} height={'100%'} src={bigLogo} alt="" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

const MobileHeader = ({ user }: { user: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const targetElement =
        window &&
        (window.document.getElementsByClassName(
          styles["burgerContainerSub"] || ""
        )[0] as HTMLElement);

      if (!targetElement.contains(event.target as HTMLElement)) {
        setIsMenuOpen(false);
      }
    }

    // Bind the event listener

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div
      className={`sticky-top postion-relative ${styles["mobileHeaderContainer"]}`}
    >
      <div className={styles["mobileHeaderLogoContainer"]}>
        <Link href="/">
          <Image
            priority={true}
            width={"100px"}
            height={"33px"}
            src={logo}
            alt=""
          />
        </Link>
      </div>
      <div
        className={styles["mobileHeaderLogoContainer"]}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <Image
          priority={true}
          width={"20px"}
          height={"15px"}
          src={burger}
          alt=""
        />
      </div>
      <div
        onClick={() => {
          // setIsMenuOpen(!isMenuOpen)
        }}
        className={styles[isMenuOpen ? "backOpacityContainer" : "hide"]}
      >
        <BurgerContainer user={user} />
      </div>
    </div>
  );
};

const Header = ({ user }: any) => {
  const [navSearch, setNavSearch] = useState(false);

  return (
    <>
      <MediaQuery minWidth={1224}>
        <div className={`sticky-top ${styles["mainWrapper"]}`}>
          {/* <HeaderTopContainer navSearch={navSearch} setNavSearch={setNavSearch} /> */}
          <NavBarContainer user={user} />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={1224}>
        <MobileHeader user={user} />
      </MediaQuery>
    </>
  );
};

const mapStateToProps = (state: any) => ({ user: state.auth.data.user });

const mapDispatchProps = {};

export default connect(mapStateToProps, mapDispatchProps)(Header);
