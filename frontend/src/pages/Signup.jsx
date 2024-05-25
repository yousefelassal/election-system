import { Link } from "react-router-dom"

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 lg:px-8">
        <header className="flex w-full items-center justify-between">
            <Link to="/" className="group flex items-center justify-center gap-1">
                <svg className="lg:hidden" xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                    <rect x="0.5" y="0.5" width="38" height="38" rx="9.5" stroke="#D8DADC"/>
                    <path d="M15 19.4958C15 19.6426 15.0265 19.7781 15.0796 19.9023C15.1385 20.0265 15.2269 20.1451 15.3448 20.258L22.2318 26.712C22.4322 26.904 22.6739 27 22.9568 27C23.1513 27 23.3251 26.9548 23.4784 26.8645C23.6375 26.7798 23.7642 26.6612 23.8585 26.5088C23.9528 26.3619 24 26.1982 24 26.0175C24 25.7465 23.891 25.5065 23.6729 25.2976L17.4666 19.4958L23.6729 13.694C23.891 13.485 24 13.2479 24 12.9825C24 12.7962 23.9528 12.6296 23.8585 12.4828C23.7642 12.336 23.6375 12.2202 23.4784 12.1355C23.3251 12.0452 23.1513 12 22.9568 12C22.6739 12 22.4322 12.0932 22.2318 12.2795L15.3448 18.7335C15.2269 18.8464 15.1385 18.965 15.0796 19.0892C15.0265 19.2134 15 19.349 15 19.4958Z" fill="black"/>
                </svg>
                <svg className="group-hover:-translate-x-1 transition-transform hidden lg:flex" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clipPath="url(#clip0_1_147)">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#666666"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1_147">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <span className="hidden lg:flex font-light">Back</span>
            </Link>
            <svg className="lg:hidden" xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44" fill="none">
                <path d="M23 0L23.823 3.36707C25.109 8.62855 25.752 11.2593 27.1233 13.3821C28.336 15.2593 29.9527 16.8418 31.8554 18.0139C34.0071 19.3395 36.651 19.926 41.9388 21.0991L46 22L41.9388 22.9009C36.651 24.074 34.0071 24.6605 31.8554 25.9861C29.9527 27.1582 28.336 28.7407 27.1233 30.6179C25.752 32.7407 25.109 35.3714 23.823 40.6329L23 44L22.177 40.6329C20.891 35.3714 20.248 32.7407 18.8767 30.6179C17.664 28.7407 16.0473 27.1582 14.1446 25.9861C11.9929 24.6605 9.34898 24.074 4.06116 22.9009L0 22L4.06116 21.0991C9.34897 19.926 11.9929 19.3395 14.1446 18.0139C16.0473 16.8418 17.664 15.2593 18.8767 13.3821C20.248 11.2593 20.891 8.62855 22.177 3.36707L23 0Z" fill="#006FEE"/>
            </svg>
            <div className="hidden lg:flex gap-1">
                Already have an account?
            <Link to="/login" className="font-bold hover:text-gray-700 underline transition-colors">
                Log in
            </Link>
            </div>
        </header>
    </div>
  )
}

export default Signup