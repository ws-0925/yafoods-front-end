// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboards',
      icon: 'mdi:home-outline',
      path: '/dashboard'
    },
    {
      sectionTitle: 'Apps & Pages'
    },
    {
      title: 'Location',
      icon: 'mdi:location-outline',
      children: [
        {
          title: 'Manage City',
          path: '/location/city'
        },
        {
          title: 'Manage Areas',
          path: '/location/areas'
        }
      ]
    },
    {
      title: 'Category',
      icon: 'mdi:category-outline',
      children: [
        {
          title: 'Manage Category',
          path: '/category/ManageCategory'
        },
        {
          title: 'Sort Category',
          path: '/category/SortCategory'
        }
      ]
    },
    {
      title: 'Products',
      icon: 'mdi:cart-outline',
      children: [
        {
          title: 'Manage Products',
          path: '/products/ManageProducts'
        },
        {
          title: 'Sort Products',
          path: '/products/SortProducts'
        },
        {
          title: 'Sort Similar Products',
          path: '/products/SortSimilarProducts'
        }
      ]
    },
    {
      title: 'Promocode Management',
      icon: 'mdi:code',
      path: '/promocode'
    },
    {
      title: 'Channels',
      icon: 'mdi:category-outline',
      path: '/channels'
    },
    {
      title: 'Notification',
      icon: 'mdi:notifications-none',
      path: '/notification'
    },
    {
      title: 'Users',
      icon: 'mdi:users-outline',
      path: '/users'
    },
    {
      title: 'Orders',
      icon: 'mdi:order-bool-descending',
      path: '/orders'
    },
    {
      title: 'Drivers',
      icon: 'mdi:account-clock-outline',
      children: [
        {
          title: ' Vehicles Categories',
          path: '/drivers/vehicles-category'
        },
        {
          title: ' Vehicles Types',
          path: '/drivers/vehicles-type/ManageType'
        },
        {
          title: ' Vehicles Drivers',
          path: '/drivers/vehicles-drivers'
        }
      ]
    },
    {
      title: 'Admin Users',
      icon: 'mdi:account-lock',
      children: [
        {
          title: 'Roles',
          path: '/admin-users/roles'
        },
        {
          title: 'Users',
          path: '/admin-users/users'
        }
      ]
    },
    {
      title: 'Logs',
      icon: 'mdi:math-log',
      children: [
        {
          title: 'Users Login Logs',
          path: '/logs/user-login'
        },
        {
          title: 'Admin Login Logs',
          path: '/logs/admin-login'
        },
        {
          title: 'Delete Activity Logs',
          path: '/logs/delete-activity'
        }
      ]
    },
    {
      title: 'Reports',
      icon: 'mdi:report',
      path: '/reports'
    },
    {
      title: 'Manage Configuration',
      icon: 'mdi:category-outline',
      path: '/configuration'
    }
  ]
}

export default navigation
