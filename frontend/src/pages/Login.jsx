import { login } from "../services/login"
import { useUserStore } from "../stores/user"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { Button, Input } from '@nextui-org/react'
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const schema = z.object({
  phone: z.string().min(1),
  password: z.string().min(1),
})

const Login = () => {
  const form = useForm({ resolver: zodResolver(schema) })
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async () => {
    const { phone, password } = form.getValues()
    const user = await login(phone, password)
    if (user) {
      setUser(user)
      navigate('/verify-2fa')
    }
    if (!user) {
        form.setError('password', { type: 'manual', message: 'Invalid phone or password' })
    }
  }
  return (
    <div className="flex flex-col min-h-screen gap-8 items-center w-full">
        <header className="flex w-full items-center justify-between lg:border-b p-4 lg:px-8">
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
            <Link to="/signup" className="hidden lg:flex hover:text-gray-700 transition-colors">
                Create an account
            </Link>
        </header>
        <form onSubmit={form.handleSubmit(handleLogin)} className="flex w-full flex-col max-w-md gap-4 p-4 lg:px-8">
            <div className="flex items-center flex-col gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44" fill="none">
            <path d="M23 0L23.823 3.36707C25.109 8.62855 25.752 11.2593 27.1233 13.3821C28.336 15.2593 29.9527 16.8418 31.8554 18.0139C34.0071 19.3395 36.651 19.926 41.9388 21.0991L46 22L41.9388 22.9009C36.651 24.074 34.0071 24.6605 31.8554 25.9861C29.9527 27.1582 28.336 28.7407 27.1233 30.6179C25.752 32.7407 25.109 35.3714 23.823 40.6329L23 44L22.177 40.6329C20.891 35.3714 20.248 32.7407 18.8767 30.6179C17.664 28.7407 16.0473 27.1582 14.1446 25.9861C11.9929 24.6605 9.34898 24.074 4.06116 22.9009L0 22L4.06116 21.0991C9.34897 19.926 11.9929 19.3395 14.1446 18.0139C16.0473 16.8418 17.664 15.2593 18.8767 13.3821C20.248 11.2593 20.891 8.62855 22.177 3.36707L23 0Z" fill="#006FEE"/>
            </svg>
                <h1 className="font-bold text-lg lg:text-3xl">Login</h1>
            </div>
            <div className="flex flex-col w-full gap-1">
                <label>Phone</label>
                <Input
                    {...form.register('phone')}
                />
            </div>
            <div className="flex flex-col w-full gap-1">
                <label>Password</label>
                <Input
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                                <path d="M17.5194 1.0987L16.7835 0.362755C16.5755 0.154764 16.1915 0.186773 15.9515 0.474718L13.3913 3.01868C12.2392 2.52274 10.9754 2.28274 9.64731 2.28274C5.69519 2.29868 2.27141 4.60265 0.62329 7.91486C0.527263 8.12285 0.527263 8.37878 0.62329 8.55476C1.39122 10.1228 2.54329 11.4188 3.9833 12.3948L1.8873 14.5227C1.6473 14.7627 1.61529 15.1467 1.77534 15.3547L2.51128 16.0907C2.71928 16.2987 3.10326 16.2666 3.34326 15.9787L17.3912 1.93081C17.6952 1.69095 17.7272 1.30698 17.5192 1.09897L17.5194 1.0987ZM10.4953 5.93058C10.2233 5.86657 9.93534 5.78661 9.66332 5.78661C8.30327 5.78661 7.21538 6.87463 7.21538 8.23454C7.21538 8.50655 7.2794 8.7945 7.35935 9.06652L6.28724 10.1226C5.96728 9.5626 5.7913 8.9385 5.7913 8.23458C5.7913 6.1066 7.50332 4.39458 9.6313 4.39458C10.3354 4.39458 10.9593 4.57056 11.5193 4.89052L10.4953 5.93058Z" fill="#666666" fillOpacity="0.8"/>
                                <path d="M18.6714 7.9148C18.1114 6.79475 17.3753 5.78682 16.4634 4.97079L13.4874 7.9148V8.23475C13.4874 10.3627 11.7754 12.0748 9.64739 12.0748H9.32744L7.43945 13.9627C8.14351 14.1067 8.87946 14.2027 9.59946 14.2027C13.5516 14.2027 16.9754 11.8988 18.6235 8.57062C18.7675 8.34655 18.7675 8.12264 18.6714 7.91463L18.6714 7.9148Z" fill="#666666" fillOpacity="0.8"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.626 8.26235e-05C12.3789 0.0541739 15.4579 3.48248 17 6.43226C17 6.43226 16.4573 7.5606 15.9484 8.2829C15.7021 8.63233 15.443 8.97275 15.1707 9.30198C14.9766 9.53638 14.7761 9.76464 14.5681 9.98642C12.7094 11.9698 10.04 13.4493 7.22122 12.8749C4.08975 12.2366 1.53539 9.51041 0 6.57831C0 6.57831 0.545159 5.44888 1.05695 4.72766C1.28623 4.4042 1.52687 4.08939 1.77886 3.78395C1.97194 3.54991 2.17212 3.32165 2.37903 3.09987C4.02125 1.34155 6.12842 -0.0121781 8.626 8.26235e-05ZM8.61287 1.44252C6.52238 1.43458 4.78398 2.62063 3.40866 4.09299C3.22162 4.29313 3.04132 4.4994 2.8667 4.71071C2.63706 4.9891 2.41772 5.27651 2.20867 5.57113C1.99962 5.86538 1.78525 6.23681 1.61525 6.55234C2.96891 8.86348 5.00083 10.951 7.50054 11.4606C9.82989 11.9355 12.0038 10.6308 13.5399 8.99186C13.7276 8.79172 13.909 8.58509 14.0843 8.37342C14.3328 8.07303 14.5691 7.76255 14.7938 7.44341C15.0018 7.14807 15.2158 6.77592 15.3855 6.46003C13.9807 4.07099 11.5772 1.4894 8.61287 1.44252Z" fill="black" fillOpacity="0.6"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.49994 3.61423C10.0705 3.61423 11.3457 4.9099 11.3457 6.50523C11.3457 8.10093 10.0705 9.39623 8.49994 9.39623C6.92977 9.39623 5.65454 8.10093 5.65454 6.50523C5.65454 4.9099 6.92977 3.61423 8.49994 3.61423Z" fill="black" fillOpacity="0.6"/>
                                </svg>
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    {...form.register('password')}
                />
            </div>
            {form.formState.errors.password && <p className="text-red-500">{form.formState.errors.password.message}</p>}
            <div className="flex flex-col items-center w-full gap-1">
                <Button
                    className="flex w-full"
                    color="primary"
                    type="submit"
                    isLoading={form.formState.isSubmitting}
                    disabled={form.formState.isSubmitting}
                >
                    Login
                </Button>
                <div className="lg:hidden flex gap-1">
                    <span>Do not have an account?</span>
                    <Link to="/signup" className="hover:text-gray-700 font-bold transition-colors">Sign up</Link>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login