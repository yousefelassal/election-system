import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center">
        <div className="flex max-w-lg flex-col flex-1 gap-6 items-center justify-center">
            <svg className="lg:hidden" width="289" height="241" viewBox="0 0 289 241" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M186.797 53.0143C188.253 47.5791 195.965 47.5791 197.422 53.0142L198.172 55.8126C208.964 96.0887 240.46 127.526 280.756 138.244L283.682 139.022C289.131 140.471 289.131 148.203 283.682 149.652L280.756 150.431C240.46 161.149 208.964 192.586 198.172 232.862L197.422 235.66C195.965 241.095 188.253 241.095 186.797 235.66L186.047 232.862C175.254 192.586 143.759 161.149 103.463 150.431L100.536 149.652C95.0875 148.203 95.0875 140.471 100.536 139.022L103.463 138.244C143.759 127.526 175.254 96.0887 186.047 55.8126L186.797 53.0143Z" fill="#F1F3F4" stroke="black"/>
                <path d="M118.864 5.75663C120.321 0.321459 128.033 0.321449 129.49 5.75661L130.15 8.22234C140.943 48.4984 172.439 79.9351 212.735 90.653L215.328 91.3428C220.776 92.7919 220.776 100.524 215.328 101.973L212.735 102.663C172.439 113.381 140.943 144.818 130.15 185.094L129.49 187.559C128.033 192.995 120.321 192.995 118.864 187.559L118.204 185.094C107.411 144.818 75.9154 113.381 35.6193 102.663L33.0259 101.973C27.5775 100.524 27.5775 92.7919 33.0259 91.3428L35.6193 90.653C75.9154 79.9351 107.411 48.4984 118.204 8.22236L118.864 5.75663Z" stroke="black"/>
                <path d="M212.265 2.20869C212.433 0.569841 214.824 0.569832 214.992 2.20869C215.783 9.93246 221.9 16.0471 229.627 16.8197C231.265 16.9835 231.265 19.3708 229.627 19.5346C221.9 20.3072 215.783 26.4218 214.992 34.1456C214.824 35.7845 212.433 35.7844 212.265 34.1456C211.473 26.4218 205.356 20.3072 197.629 19.5346C195.991 19.3708 195.991 16.9835 197.629 16.8197C205.356 16.0471 211.473 9.93246 212.265 2.20869Z" fill="#F1F3F4" stroke="black"/>
                <path d="M10.4627 51.5467C10.5413 50.7861 11.6527 50.7861 11.7313 51.5467C12.2249 56.3259 16.0138 60.1124 20.7965 60.5869C21.5552 60.6621 21.5552 61.7681 20.7965 61.8433C16.0138 62.3178 12.2249 66.1043 11.7313 70.8835C11.6527 71.6441 10.5413 71.6441 10.4627 70.8835C9.96906 66.1043 6.18018 62.3178 1.39746 61.8433C0.638807 61.7681 0.638817 60.6621 1.39746 60.5869C6.18018 60.1124 9.96906 56.3259 10.4627 51.5467Z" fill="#F1F3F4" stroke="black"/>
            </svg>
            <div className="flex flex-col gap-1 items-center justify-center text-center">
                <h1 className="font-black text-3xl lg:text-4xl">E-Voting System</h1>
                <span className="text-gray-700">Please Login or Signup to continue</span>
            </div>
            <div className="flex flex-col w-full items-center gap-2 mt-12 lg:mt-0">
                <Link to="/login" className="flex items-center justify-center bg-blue-500 max-w-sm w-full hover:bg-blue-600 text-white text-center font-bold py-3 px-4 rounded-md transition-colors focus:outline-none focus:shadow-outline">Signin</Link>
                <Link to="/signup" className="flex items-center justify-center border max-w-sm w-full bg-white hover:bg-blue-700/20 text-center text-black font-bold py-3 px-4 rounded-md transition-colors focus:outline-none focus:shadow-outline">Create account</Link>
            </div>
        </div>
        <div className="hidden lg:flex relative h-screen w-full flex-1">
            <img src="https://utfs.io/f/536bcba5-aad4-49f6-955f-8cf9bbf50ac3-cariz.jpg" alt="Landing Page" className="object-cover h-full w-full" />
        </div>
    </div>
  )
}

export default LandingPage