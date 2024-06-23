"use client"
import { useState } from "react"
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useGetUser } from "@/app/hooks/auth.hooks"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Settings from "@mui/icons-material/Settings"
import Logout from "@mui/icons-material/Logout"
import Divider from "@mui/material/Divider"
import { setCookie } from "cookies-next"

export default function Header() {
  const { data: user, isLoading: userLoading } = useGetUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    setCookie("xToken", "")
    window.location.reload()
  }
  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="/logo.png" alt="" />
          </Link>
        </div>
        {/*<div className="flex lg:hidden">*/}
        {/*  <button*/}
        {/*    type="button"*/}
        {/*    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"*/}
        {/*    onClick={() => setMobileMenuOpen(true)}*/}
        {/*  >*/}
        {/*    <span className="sr-only">Open main menu</span>*/}
        {/*    <Bars3Icon className="h-6 w-6" aria-hidden="true" />*/}
        {/*  </button>*/}
        {/*</div>*/}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">SDM NET</PopoverGroup>
        {user ? (
          <div>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ bgcolor: "#1fab89", width: 36, height: 36 }}>{user?.email[0].toUpperCase()}</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  border: "1px solid #eeeeee",
                  boxShadow: "0 1px 2px 0 #0000000d",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={handleClose}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <p className="text-gray-500 text-xs">Signed in as : </p>
                <p className="text-xs">{user?.email}</p>
              </MenuItem>
              <Divider
                sx={{
                  marginTop: "0",
                  marginBottom: "0",
                }}
              />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <Link href="/">
                  <p className="text-sm">Profile</p>
                </Link>
              </MenuItem>
              <Divider />

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <p className="text-sm">Sign out</p>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/auth/signIn" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
      </nav>
      {/*<Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>*/}
      {/*  <div className="fixed inset-0 z-10" />*/}
      {/*  <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">*/}
      {/*    <div className="flex items-center justify-between">*/}
      {/*      <a href="#" className="-m-1.5 p-1.5">*/}
      {/*        <span className="sr-only">sdmNet</span>*/}
      {/*        <img*/}
      {/*          className="h-8 w-auto"*/}
      {/*          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"*/}
      {/*          alt=""*/}
      {/*        />*/}
      {/*      </a>*/}
      {/*      <button*/}
      {/*        type="button"*/}
      {/*        className="-m-2.5 rounded-md p-2.5 text-gray-700"*/}
      {/*        onClick={() => setMobileMenuOpen(false)}*/}
      {/*      >*/}
      {/*        <span className="sr-only">Close menu</span>*/}
      {/*        <XMarkIcon className="h-6 w-6" aria-hidden="true" />*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*    <div className="mt-6 flow-root">*/}
      {/*      <div className="-my-6 divide-y divide-gray-500/10">*/}
      {/*        <div className="space-y-2 py-6">*/}
      {/*          <a*/}
      {/*            href="#"*/}
      {/*            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
      {/*          >*/}
      {/*            Products*/}
      {/*          </a>*/}
      {/*          <a*/}
      {/*            href="#"*/}
      {/*            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
      {/*          >*/}
      {/*            Features*/}
      {/*          </a>*/}
      {/*          <a*/}
      {/*            href="#"*/}
      {/*            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
      {/*          >*/}
      {/*            Marketplace*/}
      {/*          </a>*/}
      {/*          <a*/}
      {/*            href="#"*/}
      {/*            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
      {/*          >*/}
      {/*            Company*/}
      {/*          </a>*/}
      {/*        </div>*/}
      {/*        <div className="py-6">*/}
      {/*          <Link*/}
      {/*            href="/auth/signIn"*/}
      {/*            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
      {/*          >*/}
      {/*            Log in*/}
      {/*          </Link>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </DialogPanel>*/}
      {/*</Dialog>*/}
    </header>
  )
}
