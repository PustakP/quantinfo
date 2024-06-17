import { cn } from "@/lib/utils"
import { Separator } from "./separator"

const Footer = () => (
  <>
  <Separator />
  <footer className={cn("bg-neutral-950 text-neutral-400 p-4 text-center")}>
    <p>© 2024 Pustak Pathak. All rights reserved.</p>
  </footer>
  </>
);

export default Footer;
