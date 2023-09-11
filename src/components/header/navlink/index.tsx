import { Box, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

export default function NavLink ({ link }: any) {
  const { label, url } = link
  return (
    <Link
      as={NextLink}
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={url}
    >
      {label}
    </Link>
  )
}
