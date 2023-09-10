'use client'

import {
  Box,
  Flex,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  IconButton,
  HStack,
} from '@chakra-ui/react'
import {
  CloseIcon,
  HamburgerIcon,
  MoonIcon, 
  SunIcon,
} from '@chakra-ui/icons'
import NavLink from './navlink'

export default function Header () {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const links = [
    {
      label: 'Documentation',
      url: '/documentation',
    },
    {
      label: 'About',
      url: '/about',
    },
  ] 

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton 
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose  : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Box>One Piece API</Box>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            {links.map((link) => (<NavLink key={link.label} link={link} />))}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
      {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {links.map((link) => (
                <NavLink key={link.label} link={link} />
              ))}
            </Stack>
          </Box>
        ) : null}
    </Box>
  )
}
