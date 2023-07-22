const AuthFooter = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between mx-10 mt-2">
      <div className="dark:text-neutral-100 text-neutral-800 text-sm">
        This site is protected by Privacy Policy
      </div>
      <div className="hidden sm:flex gap-0 sm:flex-row sm:gap-4 mb-12 md:mb-0">
        <a href="#" className="dark:text-neutral-100 text-neutral-800 text-sm">
          Terms and Conditions
        </a>
        <a href="#" className="dark:text-neutral-100 text-neutral-800 text-sm">
          Privacy Policy
        </a>
        <a href="#" className="dark:text-neutral-100 text-neutral-800 text-sm">
          CA Privacy Notice
        </a>
      </div>
    </div>
  )
}

export { AuthFooter }
