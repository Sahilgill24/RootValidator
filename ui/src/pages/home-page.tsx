import { Button } from "@/components/ui/button";
import homeBg from "@/assets/home-background.svg";
import metamaskLogo from "@/assets/metamask.svg";
import { useAccount, useConnect } from "wagmi";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  const navigate = useNavigate();
  if (isConnected) {
    navigate("/dashboard");
  }

  return (
    <>
      <div
        className="h-screen w-full flex flex-col items-center justify-center"
        style={{
          background: `url(${homeBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-7xl font-black mb-4 bg-gradient-to-br tracking-tight text-transparent bg-clip-text from-primary from-[20%] to-accent/50 to-[200%]">
          RootValidator
        </h1>
        {/* TODO: Idhar description change krdiyo */}
        <p className="text-lg font-medium text-secondary-foreground mb-8">

          <span className="font-bold text-primary">The Ultimate GUI for DKG initiation along with an Account Dashboards</span>

        </p>
        <Button
          className="px-8 text-base border font-medium"
          variant={"shine"}
          onClick={() => connect({ connector: connectors[0] })}
          size={"lg"}
        >
          Connect Wallet
          <img
            src={metamaskLogo}
            alt="Metamask Logo"
            className="w-6 h-6 ml-2"
          />
        </Button>
      </div>
    </>
  );
};

export default HomePage;
