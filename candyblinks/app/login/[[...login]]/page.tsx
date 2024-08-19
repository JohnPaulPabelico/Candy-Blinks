import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-dvh flex justify-center items-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-950 from-10% via-neutral-950 via-70%  to-neutral-950 ">
      <div className="">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: {
                fontSize: 14,
                textTransform: "none",
                backgroundColor: "#f87171",
                "&:hover, &:focus, &:active": {
                  backgroundColor: "#ef4444",
                },
              },
              card: {
                background:
                  //   "linear-gradient(180deg, rgba(80,7,36,1) 0%, rgba(0,0,0,1) 30%);",
                  "linear-gradient(0deg, rgba(10,10,10,1) 0%, rgba(10,10,10,1) 50%);",
              },
              headerTitle: {
                color: "white",
              },
              socialButtonsBlockButton: {
                color: "white",
                backgroundColor: "#f87171",
                "&:hover, &:focus, &:active": {
                  backgroundColor: "#ef4444",
                },
              },
              dividerLine: {
                backgroundColor: "rgb(215 215 215 / .3)",
              },
              dividerText: {
                color: "white",
              },
              formFieldLabel: {
                color: "rgb(116, 118, 134)",
              },
              formFieldAction: {
                color: "rgb(116, 118, 134)",
                "&:hover, &:focus, &:active": {
                  color: "white",
                },
              },
              footer: {
                background:
                  // background:
                  "linear-gradient(0deg, rgba(10,10,10,1) 0%, rgba(10,10,10,1) 50%);",
                //   "black",
              },
              footerActionLink: {
                color: "rgb(116, 118, 134)",
                "&:hover, &:focus, &:active": {
                  color: "white",
                },
              },
              identityPreviewEditButtonIcon: {
                color: "white",
              },
              identityPreviewText: {
                color: "white",
              },
              alternativeMethodsBlockButton: {
                color: "white",
                backgroundColor: "#9c9c9c",
                "&:hover, &:focus, &:active": {
                  backgroundColor: "#666666",
                },
              },
              alternativeMethodsBlock: {},
              backLink: {
                color: "rgb(116, 118, 134)",
                "&:hover, &:focus, &:active": {
                  color: "white",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
