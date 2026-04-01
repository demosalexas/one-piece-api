import Image from "next/image";
import Link from 'next/link'

export default function Logo () {
  return (
    <Link href='/' className="hover:cursor-pointer">
      <Image 
        src="/luffy-flag-icon.png" 
        alt="Luffy Jolly Roger"
        width="40" 
        height="40"
      />
    </Link>
  )
}
