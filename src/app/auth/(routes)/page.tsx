import { CredentialsForm } from "@/components/credentialsForm";
import { Navbar } from "@/components/Navbar";

export default async function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-5">
      <Navbar/>
      <div className="flex items-center justify-center h-min-screen">
      <CredentialsForm/>
      </div>
    </div>
  );
}
