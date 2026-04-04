import Image from "next/image";
import Link from "next/link";

/** Icon only — use inside a parent `Link` when the whole row should be one link. */
export function LogoMark() {
  return (
    <Image
      alt="Luffy Jolly Roger"
      height={40}
      src="/luffy-flag-icon.png"
      width={40}
    />
  );
}

export default function Logo() {
  return (
    <Link className="hover:cursor-pointer" href="/">
      <LogoMark />
    </Link>
  );
}
