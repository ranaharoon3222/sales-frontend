import React from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';

import { Link as RouterLink } from 'react-router-dom';
import * as menus from '../../settings/constant';
import { useStoreActions } from 'easy-peasy';

const menuItems = [
  {
    name: 'Dashboard',
    path: '/',
  },
  {
    name: 'Reports',
    path: menus.REPORTS,
  },
  {
    name: 'Products',
    subMenu: [
      {
        name: 'List Products',
        path: menus.PRODUCTS,
      },
      {
        name: 'Add Products',
        path: menus.ADD_PRODUCTS,
      },
    ],
  },
  {
    name: 'Clients',
    subMenu: [
      {
        name: 'List Clients',
        path: menus.CLIENTS,
      },
      {
        name: 'Add Clients',
        path: menus.ADD_CLIENTS,
      },
    ],
  },
  {
    name: 'Refrences',
    subMenu: [
      {
        name: 'List Refrences',
        path: menus.REFRENCES,
      },
      {
        name: 'Add Refrences',
        path: menus.ADD_REFRENCES,
      },
    ],
  },

  {
    name: 'Brands',
    subMenu: [
      {
        name: 'List Brands',
        path: menus.BRANDS,
      },
      {
        name: 'Add Brands',
        path: menus.ADD_BRANDS,
      },
    ],
  },

  {
    name: 'Sales',
    subMenu: [
      {
        name: 'List Invoice',
        path: menus.ORDERS,
      },
      {
        name: 'Add Invoice',
        path: menus.ADD_ORDERS,
      },
      {
        name: 'Installments',
        path: '/installments',
      },
    ],
  },
];

export default function SidebarWithHeader({ children, visibility }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH='100vh' bg='gray.100' display={visibility}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', lg: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, lg: 44 }} p='4'>
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition='3s ease'
      bg='white'
      borderRight='1px'
      borderRightColor='gray.200'
      w={{ base: 'full', lg: 44 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='24' alignItems='center' mx='8' justifyContent='space-between'>
        <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
          <img src='/cw.png' width='100px' alt='' />
        </Text>
        <CloseButton display={{ base: 'flex', lg: 'none' }} onClick={onClose} />
      </Flex>
      <Accordion>
        {menuItems.map((link) => (
          <NavItem
            key={link.name}
            to={link.path}
            title={link.name}
            isSub={link?.subMenu}
          >
            {link.subMenu
              ? link.subMenu.map((sub) => {
                  return (
                    <AccordionPanel
                      key={sub.name}
                      pb={2}
                      borderBottom={2}
                      borderWidth={2}
                    >
                      <RouterLink
                        to={sub.path}
                        style={{ textDecoration: 'none' }}
                      >
                        {sub.name}
                      </RouterLink>
                    </AccordionPanel>
                  );
                })
              : ''}
          </NavItem>
        ))}
      </Accordion>
    </Box>
  );
};

const NavItem = ({ title, children, to, isSub, ...rest }) => {
  const color = useColorModeValue('inherit', 'gray.400');
  const bg = useColorModeValue('gray.100', 'gray.900');
  const hoverColor = useColorModeValue('gray.900', 'gray.200');

  return isSub ? (
    <AccordionItem pb={1} pt={1}>
      <AccordionButton _expanded={{ bg: 'purple.500', color: 'white' }}>
        <Flex
          align='center'
          cursor='pointer'
          color={color}
          _hover={{
            bg,
            color: hoverColor,
          }}
          role='group'
          fontWeight='semibold'
          transition='.15s ease'
        >
          {title}
        </Flex>
        <AccordionIcon />
      </AccordionButton>
      {children}
    </AccordionItem>
  ) : (
    <RouterLink to={to} style={{ textDecoration: 'none' }}>
      <Flex
        pb={3}
        pl={3}
        pt={4}
        align='center'
        cursor='pointer'
        color={color}
        _hover={{
          bg,
          color: hoverColor,
        }}
        role='group'
        fontWeight='semibold'
        transition='.15s ease'
      >
        {title}
      </Flex>
    </RouterLink>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const logOut = useStoreActions((actions) => actions.Auth.logOut);
  return (
    <Flex
      ml={{ base: 0, lg: 44 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', lg: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', lg: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', lg: 'none' }}
        fontSize='2xl'
        fontFamily='monospace'
        fontWeight='bold'
      >
        Logo
      </Text>

      <HStack spacing={{ base: '0', lg: '6' }}>
        <IconButton
          size='lg'
          variant='ghost'
          aria-label='open menu'
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar size={'sm'} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'
                >
                  <Text fontSize='sm'>Justina Clark</Text>
                  <Text fontSize='xs' color='gray.600'>
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <RouterLink to={menus.PROFILE}>
                <MenuItem>Profile</MenuItem>
              </RouterLink>
              <MenuDivider />
              <MenuItem onClick={logOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
