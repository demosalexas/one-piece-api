import Image from "next/image";
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

export default function Logo () {
  return (
    <Link as={NextLink} href='/' _hover={{cursor: 'pointer'}}>
      <Image 
        src="/luffy-flag-icon.png" 
        alt="Luffy Jolly Roger"
        width="40" 
        height="40"
      />
    </Link>
  )
}
