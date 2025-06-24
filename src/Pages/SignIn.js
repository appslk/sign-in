import { useNavigate } from "react-router";

import { IoStar } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";

import { cn } from "../lib/utils";
import FormSection from "../components/auth/FormSection";
import GradientButton from "../components/buttons/GradientButton";
import OutlineButton from "../components/buttons/OutlineButton";

import jet from "../assets/mediumLogin.gif";
import classes from "../auth.module.css";

const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-montserrat relative bg-fixed text-[12px] text-white sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]">
      <div className="absolute inset-0 bg-black/70"></div>

      <div className={cn(classes["custom-grid"], "relative min-h-dvh")}>
        {/* Video section */}
        <div
          className={cn(
            "relative flex items-center justify-center bg-black",
            classes["image-area"]
          )}
        >
          <img src={jet} alt="Log in" />

          <div className="absolute top-full right-0 left-0 h-[50%] -translate-y-1/2 bg-gradient-to-b from-transparent via-black to-transparent lg:hidden"></div>
          <div className="absolute top-0 bottom-0 left-0 w-[50%] -translate-x-1/2 bg-gradient-to-r from-transparent via-black to-transparent"></div>

          <button
            // onClick={() => navigate("/home")}
            className="hover:bg-primary focus:bg-primary absolute top-[1em] left-[1em] z-50 cursor-pointer rounded-full p-[0.3em] text-[30px] transition-all hover:text-black focus:text-black"
          >
            <FaArrowLeft />
          </button>
        </div>

        {/* Form section */}
        <div
          className={cn(
            "flex items-center justify-center p-[2em]",
            classes["form-area"]
          )}
        >
          <FormSection>
            <p className="text-center">
              Please sign in with your wallet to continue.
            </p>

            {/* {error && (
              <div className="rounded bg-red-500/10 p-2 text-center text-[0.8em] text-red-500">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded bg-green-500/10 p-2 text-center text-[0.8em] text-green-500">
                {success}
              </div>
            )} */}

            <ul className="flex flex-col items-center space-y-2 px-[1em] text-center">
              <li className="flex items-center gap-2">
                <span className="text-[#5ff48b]">✔</span>
                <span>Secure login</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#5ff48b]">✔</span>
                <span>Your data stays private</span>
              </li>
            </ul>

            <div className="my-[0.5em] flex items-center justify-between gap-[0.5em]">
              <hr className="grow border-t-white/30" />
              <p className="flex shrink-0 items-end gap-[0.2em] opacity-50">
                <IoStar className="text-[0.8em]" />
                <IoStar className="-translate-y-[0.1em]" />
                <IoStar className="text-[0.8em]" />
              </p>
              <hr className="grow border-t-white/30" />
            </div>

            {/* {username && (
              <div className="mb-4 rounded border border-gray-600 bg-gray-800 p-3">
                <p className="text-center">
                  Signed in as: <span className="font-bold">{username}</span>
                </p>
              </div>
            )} */}

            <div className="flex flex-col gap-2">
              {/* {!walletAddress ? (
                <div className="space-y-2">
                  <OutlineButton
                    type="button"
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="w-full px-[1em] uppercase"
                  >
                    {isConnecting ? "Connecting..." : "Connect Wallet"}
                  </OutlineButton>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="mx-auto w-fit truncate font-mono text-[0.8em]">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </p>
                  <OutlineButton
                    type="button"
                    onClick={disconnectWallet}
                    className="w-full px-[1em] uppercase"
                  >
                    Disconnect
                  </OutlineButton>
                </div>
              )} */}

              <OutlineButton
                type="button"
                className="w-full px-[1em] uppercase"
              >
                Connect Wallet
              </OutlineButton>

              <GradientButton
                type="submit"
                className="mt-[1em] w-full uppercase"
                // className={`mt-[1em] w-full uppercase ${
                //   !walletAddress || !isRegistered || isSubmitting
                //     ? "cursor-not-allowed opacity-50"
                //     : ""
                // }`}
              >
                {/* {isSubmitting ? "Signing In..." : "Sign In"} */}
                Sign In
              </GradientButton>
            </div>

            <div className="mt-4 text-center">
              <span>Don&apos;t have an account?</span>&nbsp;
              <button
                onClick={() => navigate("/sign-up")}
                className="text-[#5ff48b] hover:opacity-90"
              >
                Sign Up
              </button>
            </div>
          </FormSection>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
