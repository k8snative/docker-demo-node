import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import MediaQuery from 'react-responsive'
import Api from 'src/lib/api'
import { logout as logoutRedux } from 'src/lib/redux/auth/action'
import email from '~public/assets/email.png'

import arrowRightRed from '../../public/assets/arrowRightRed.png'
import bigLogo from '../../public/assets/bigLogo.png'
import burger from '../../public/assets/burger.png'
import burgerSearch from '../../public/assets/burgerSearch.png'
import dropDownIconRed from '../../public/assets/dropDownIconRed.png'
import facebook from '../../public/assets/facebook.png'
import insta from '../../public/assets/insta.png'
import linkedIn from '../../public/assets/linkedIn.png'
import logo from '../../public/assets/logo.png'
import Phone from '../../public/assets/phone.png'
import profilePicture from '../../public/assets/profilePicture.png'
import redsearchIcon from '../../public/assets/redsearchicon.png'
import rightIconGrey from '../../public/assets/rightIconGrey.png'
import searchIcon from '../../public/assets/searchIcon.png'
import searchSubIcon from '../../public/assets/searchSubIcon.png'
import threeDots from '../../public/assets/threeDots.png'
import watch from '../../public/assets/watch.png'
import styles from '../styles/Header.module.scss'
import CustomDropdown from './CustomDropDown/CustomDropdown'
import SignInUpButton from './SignInUpButton/SignInUpButton'

const menuItems = [
  { label: 'Auto Takaful', route: '/products/auto' },
  { label: 'Health Takaful', route: '/products/health' },
  { label: 'Life Takaful', route: '' },
  { label: 'Travel Takaful', route: '' },
]

const HeaderTopContainer = ({ navSearch }: { navSearch: any }) => {
  const [searchBarOpen, setSearchBarOpen] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | KeyboardEvent) {
      if (!searchBarOpen) {
        return
      }
      if ('keyCode' in event && event.keyCode === 27) {
        setSearchBarOpen(false)
      }
      const targetElement =
        window && (window.document.getElementsByClassName(styles['navSearchContainer'] || '')[0] as HTMLElement)

      if (!targetElement.contains(event.target as HTMLElement)) {
        setSearchBarOpen(false)
      }
      const targetElementForDropDown =
        window &&
        (window.document.getElementsByClassName(styles['profPicDropDownMenuContainer'] || '')[0] as HTMLElement)
      if (!targetElementForDropDown.contains(event.target as HTMLElement)) {
        false
      }
    }

    // Bind the event listener
    document.addEventListener('keydown', handleClickOutside)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('keydown', handleClickOutside)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  return (
    <>
      <div className={styles['topContainer']}>
        <Link href={'/products/faq'}>
          <p className={styles['topHeaderTxt']}> FAQ&apos;s</p>
        </Link>
        <Link href={'/products/contactUs'}>
          <p className={styles['topHeaderTxt']}>Contact Us</p>
        </Link>
        <p className={styles['topHeaderTxt']}>|</p>
        <div
          className={styles['topHeaderImgContainer']}
          onClick={() => {
            if (!searchBarOpen) setSearchBarOpen(true)
          }}
        >
          <Image width={'20px'} height={'20px'} src={searchBarOpen ? redsearchIcon : searchIcon} alt="" />
        </div>
        <div
          id="nav-search"
          className={styles[searchBarOpen ? 'navSearchContainer' : 'hide']}
          style={{ display: navSearch }}
        >
          <div className={styles['navSearch']}>
            <input type={'text'} placeholder="Search" className={styles['navInput']} />
            <div className={styles['searchSubIconContainer']}>
              <Image width={'25px'} height={'25px'} src={searchSubIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const NavBarContainer = ({ user }: any) => {
  const [profileOpen, setProfileOpen] = useState(false)
  const dispatch = useDispatch()

  const [buttonClicked, setButtonClicked] = useState<boolean>(false)

  const handleLogout = async () => {
    setButtonClicked(true)
    await Api('GET', 'customer/logout').then((response: any) => {
      if (response.success) {
        setButtonClicked(false)
        router.replace('/auth/auth').then(() => {
          dispatch(logoutRedux())
        })
      } else {
        router.push({ pathname: '/auth/auth' })
      }
    })
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | KeyboardEvent) {
      if (!profileOpen) {
        return
      }
      if ('keyCode' in event && event.keyCode === 27) {
        setProfileOpen(false)
      }
      const targetElementForDropDown =
        window &&
        (window.document?.getElementsByClassName(styles['profPicDropDownMenuContainer'] || '')[0] as HTMLElement)
      if (!targetElementForDropDown?.contains(event.target as HTMLElement)) {
        setProfileOpen(false)
      }
    }

    // Bind the event listener
    document.addEventListener('keydown', handleClickOutside)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('keydown', handleClickOutside)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

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
  const router = useRouter()

  return (
    <div className={`${styles['navBarContainer']}`}>
      <div className={styles['navBarLeftContainer']}>
        <Link href="/products/health">
          <Image priority={true} width={'140px'} height={'45px'} src={logo} alt="" />
        </Link>
      </div>
      <div className={styles['navBarRightContainerHandler']}>
        <div className={styles['navBarOptions']}>
          <div id="nav" className={styles['navOption']}>
            <CustomDropdown navtxt={'About'} />
          </div>
          <div id="nav" className={styles['navOption']}>
            <CustomDropdown
              navtxt={'Products'}
              options={true}
              navItems={[
                {
                  link: '/products/auto',
                  name: 'Auto',
                },
                {
                  link: '/products/health',
                  name: 'Health',
                },
                {
                  name: 'Life',
                },
                {
                  name: 'Travel',
                },
              ]}
            />
          </div>
          <div id="nav" className={styles['navOption']}>
            <CustomDropdown
              navtxt={'Claims'}
              options={true}
              navItems={[
                {
                  link: '/claims/auto-claims',
                  name: 'Auto',
                },
                {
                  name: 'Health',
                },
                {
                  name: 'Life',
                },
                {
                  name: 'Travel',
                },
              ]}
            />
          </div>
          {/* <div className={styles['navOption']}>
            <p className={styles['navOptionTxt']}>Renewals</p>
          </div> */}
          <div className={styles['navOption']}>
            <p className={styles['navOptionTxt']}>Businesses</p>
          </div>
          <div className={styles['navBarSeparator']} />
        </div>
        <div className={styles['navBarRightSubLeftContainer']}>
          <div className={styles['subLeftContainerSub']}>
            <p className={styles['teamtb']}>t</p>
            <p className={styles['teamtb']}>e</p>
            <p className={styles['teamtb']}>a</p>
            <p className={styles['teamtb']} />
            <p className={styles['teamtb']} />
            <p className={styles['teamtb']}>m</p>
            <p className={styles['teamtb']}>t</p>
            <p className={styles['teamtb']}>b</p>
          </div>
          <p className={styles['uan']}>UAN: 111-832-682</p>
        </div>
        {user ? (
          <div
            className={styles['navBarRightSubRightContainerSignedIn']}
            onClick={() => {
              setProfileOpen(!profileOpen)
            }}
          >
            {user && user?.profile_image_path ? (
              <div className={`${styles['profilePictureContainer']}`}>
                <Image
                  alt=""
                  src={`${process.env['NEXT_PUBLIC_IMAGE_ORIGIN']}${user?.profile_image_path}`}
                  width={'100%'}
                  height={'100%'}
                  objectFit={'cover'}
                />
              </div>
            ) : (
              <div className={styles['profilePictureContainer']}>
                <Image priority={true} src={profilePicture} alt="" />
              </div>
            )}
            <p className={styles['profileTxt']}>{`${user?.first_name} ${user?.last_name}`}</p>
            <div className={styles['profPicDropDownContainer']}>
              <Image
                priority={true}
                src={dropDownIconRed}
                className={`${profileOpen ? styles['rotate'] : styles['default']}`}
                alt=""
              />
            </div>
            {/* ------ Profile Drop Down ------ */}
            <div className={styles[profileOpen ? 'profPicDropDownMenuContainer' : 'hide']}>
              <div className={styles['profileMenuRowEmpty']}></div>
              <div className={styles['profilerows']}>
                <div
                  onClick={() => {
                    window.open(`${process.env['NEXT_PUBLIC_DASHBOARD_ORIGIN']}dashboard`)
                    // window.open(`http://localhost:3002/dashboard`)
                  }}
                  className={styles['profileMenuRowOne']}
                >
                  <div className={styles['profileMenuRowIcon']}>
                    <Image priority={true} width={'19px'} height={'17px'} src={watch} alt="" />
                  </div>
                  <p className={styles['profileTxt']}>Dash Board</p>
                </div>
                <div className={styles['profileSeparator2']}></div>
                <div className={styles['profileMenuRow']}>
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
                        ? () => {}
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
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles['navBarRightSubRightContainerSignedOut']}>
            <SignInUpButton link={'/auth/auth'} btnTxt="Sign in / Sign up" onClick={() => {}} />
          </div>
        )}
      </div>
    </div>
  )
}

const BurgerMenuItems = ({ title, items }: { title: string; items?: Array<{ label: string; route: string }> }) => {
  const [isMenuCollapsed, setMenuCollapsed] = useState(true)
  const router = useRouter()

  return (
    <div
      // style={{border:'1px solid'}}
      className={styles['BurgerMenuItems']}
    >
      <div
        className={styles['BurgerMenuItemContainer']}
        onClick={() => {
          if (items?.length) setMenuCollapsed(!isMenuCollapsed)
        }}
      >
        <p className={styles['BurgerMenuRightTxt']}>{title}</p>
        <div className={styles['BurgerMenuRightImgContainer']}>
          {isMenuCollapsed && items?.length ? (
            <Image priority={true} src={dropDownIconRed} width={18} height={10} alt="" />
          ) : (
            <Image priority={true} src={arrowRightRed} width={10} height={18} alt="" />
          )}
        </div>
      </div>
      <div className={styles[isMenuCollapsed ? 'isMenuCollapsed' : 'hide']}>
        {items?.map((item: { label: string; route: string }, index: number) => (
          <div className={styles['menuEachItem']} key={index}>
            {
              <p
                className={styles['menuEachTxt']}
                onClick={() => {
                  if (item?.route.length) {
                    router.push(item?.route)
                  }
                }}
              >
                {item.label}
              </p>
            }
            <div className={styles['BurgerMenuRightImgContainerGrey']}>
              <Image priority={true} src={rightIconGrey} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className={styles['separator']} />
    </div>
  )
}

const BurgerContainer = ({ user }: { user: any }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [buttonClicked, setButtonClicked] = useState<boolean>(false)

  const handleLogout = async () => {
    setButtonClicked(true)
    await Api('GET', 'customer/logout').then((response: any) => {
      if (response.success) {
        setButtonClicked(false)
        router.replace('/auth/auth').then(() => {
          dispatch(logoutRedux())
        })
      } else {
        router.push({ pathname: '/auth/auth' })
      }
    })
  }

  return (
    <div className={styles['burgerContainerMain']}>
      <div className={styles['burgerContainerSub']}>
        <div className={styles['burgerContainer']}>
          {user && user?.profile_image_path ? (
            <div className={`${styles['burgerProfImgContainerServer']}`}>
              <Image
                alt=""
                src={`${process.env['NEXT_PUBLIC_IMAGE_ORIGIN']}${user?.profile_image_path}`}
                width={'100%'}
                height={'100%'}
                objectFit={'cover'}
              />
            </div>
          ) : (
            <div className={`${styles['burgerProfImgContainer']}`}>
              <Image alt="" src={bigLogo} />
            </div>
          )}
          <div className={`${'justify-content-start'} ${styles['burgerProfiletxtContain']}`}>
            {user ? (
              <>
                <p className={styles['burgerProfileName']}>{`${user?.first_name} ${user?.last_name}`}</p>
                <p
                  onClick={() => window.open(`${process.env['NEXT_PUBLIC_DASHBOARD_ORIGIN']}dashboard`)}
                  className={styles['burgerDashTxt']}
                >
                  DashBoard
                </p>
              </>
            ) : (
              <p className={styles['burgerProfileName']}>Takaful Bazar</p>
            )}
          </div>
        </div>
        <div className={styles['burgerContainer']}>
          <div className={styles['burgerSearchContainer']}>
            <div className={styles['burgerImgContainer']}>
              <Image priority={true} width={'100%'} height={'100%'} src={burgerSearch} alt="" />
            </div>
            <input type={'text'} placeholder="Search" className={styles['burgerInput']} />
            <div className={styles['burgerImgDotContainer']}>
              <Image
                priority={true}
                className={styles['burgerDotImg']}
                width={'100%'}
                height={'100%'}
                src={threeDots}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={styles['burgerContainer']}>
          <div className={styles['burgerBottomContainer']}>
            <p className={styles['burgerMenuHeading']} onClick={() => {}}>
              TAKAFUL BAZAAR
            </p>
            <BurgerMenuItems title="About Us" />
            <BurgerMenuItems title="Products" items={menuItems} />
            <BurgerMenuItems title="Claims" />
            {/* <BurgerMenuItems title="Renewals" /> */}
            <BurgerMenuItems title="Businesses" />
          </div>
        </div>
        <div className={styles['burgerContainerLowest']}>
          {!user ? (
            <div className="w-100 my-4">
              <SignInUpButton link={'/auth/auth'} btnTxt="Sign in / Sign up" onClick={() => {}} />
            </div>
          ) : (
            <div onClick={buttonClicked ? () => {} : handleLogout} className={styles['logOutBtn']}>
              <h1 className={styles['logOutBtnTxt']}>Logout</h1>
            </div>
          )}
        </div>
        <div className={styles['burgerContainerLowestImg']}>
          <div className={styles['burgerLogoimg']}>
            <Image priority={true} width={'100%'} height={'100%'} src={bigLogo} alt="" />
          </div>
          <div className={styles['icons']}>
            <div className={styles['burgerImgSocialContainer']}>
              <div className={styles['burgerImgSocial']}>
                <Image priority={true} width={'100%'} height={'100%'} src={facebook} alt="" />
              </div>
              <div className={styles['burgerImgSocial']}>
                <Image priority={true} width={'100%'} height={'100%'} src={insta} alt="" />
              </div>
              <div className={styles['burgerImgSocial']}>
                <Image priority={true} width={'100%'} height={'100%'} src={linkedIn} alt="" />
              </div>
            </div>

            <div className={styles['burgerContainerLowestTxt']}>
              <p className={styles['lowerTxt']}>About Us</p>
              <p className={styles['lowerTxt']}>|</p>
              <Link href={'/products/contactUs'}>
                <p className={styles['lowerTxt']}>Contact Us</p>
              </Link>
              <p className={styles['lowerTxt']}>|</p>
              <Link href={'/products/faq'}>
                <p className={styles['lowerTxt']}>FAQs</p>
              </Link>
            </div>
          </div>
        </div>

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
  )
}

const MobileHeader = ({ user }: { user: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const targetElement =
        window && (window.document.getElementsByClassName(styles['burgerContainerSub'] || '')[0] as HTMLElement)

      if (!targetElement.contains(event.target as HTMLElement)) {
        setIsMenuOpen(false)
      }
    }

    // Bind the event listener

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  return (
    <div className={`sticky-top postion-relative ${styles['mobileHeaderContainer']}`}>
      <div className={styles['mobileHeaderLogoContainer']}>
        <Link href="/products/health">
          <Image priority={true} width={'100px'} height={'33px'} src={logo} alt="" />
        </Link>
      </div>
      <div
        className={styles['mobileHeaderLogoContainer']}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen)
        }}
      >
        <Image priority={true} width={'20px'} height={'15px'} src={burger} alt="" />
      </div>
      <div
        onClick={() => {
          // setIsMenuOpen(!isMenuOpen)
        }}
        className={styles[isMenuOpen ? 'backOpacityContainer' : 'hide']}
      >
        <BurgerContainer user={user} />
      </div>
    </div>
  )
}

const Header = ({ user }: any) => {
  const [navSearch, setNavSearch] = useState(false)

  return (
    <>
      <MediaQuery minWidth={1224}>
        <div className={`sticky-top ${styles['mainWrapper']}`}>
          <HeaderTopContainer navSearch={navSearch} setNavSearch={setNavSearch} />
          <NavBarContainer user={user} />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={1224}>
        <MobileHeader user={user} />
      </MediaQuery>
    </>
  )
}

const mapStateToProps = (state: any) => ({ user: state.auth.data.user })

const mapDispatchProps = {}

export default connect(mapStateToProps, mapDispatchProps)(Header)
