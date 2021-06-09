import {
    Home,
    Box,
    DollarSign,
    Tag,
    Clipboard,
    Camera,
    AlignLeft,
    UserPlus,
    Users,
    Chrome,
    BarChart,Settings,Archive, LogIn, Download, Loader, Bookmark, Book, Sliders, Server
} from 'react-feather';

export const MENUITEMS = [
    {
        path: '/', title: 'Tableau de Bord', id:"dashboard", icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'Produits', icon: Box, type: 'sub', active: false, children: [
            // {
                // title: 'Physical', type: 'sub', active: false, children: [
                    { path: '/products/physical/category', id:"listeCategorie",  active: false, title: 'Categories', type: 'link' },
                    // { path: '/products/physical/sub-category', title: 'Sub Category', type: 'link' },
                    { path: '/products/physical/product-list', id:"listeProduit", active:false, title: 'Liste des Produits', type: 'link' },
                    // { path: '/products/physical/product-detail', title: 'Product Detail', type: 'link' },
                    { path: '/products/physical/add-product', id:"ajouterProduit",  title: 'Ajout de Produit', type: 'link' },
                // ]
            // },
            // {
            //     title: 'digital', type: 'sub', active: false, children: [
            //         { path: '/products/digital/digital-category', title: 'Category', type: 'link' },
            //         { path: '/products/digital/digital-sub-category', title: 'Sub Category', type: 'link' },
            //         { path: '/products/digital/digital-product-list', title: 'Product List', type: 'link' },
            //         { path: '/products/digital/digital-add-product', title: 'Add Product', type: 'link' },
            //     ]
            // },
        ]
    },
    {
        title: 'Ventes', icon: DollarSign, type: 'sub', active: false, children: [
            { path: '/sales/orders', id:"commandes",  title: 'Commandes', type: 'link' },
            { path: '/sales/transactions', id:"paiements",  title: 'Paiements', type: 'link' },
            { path: '/sales/repayment', id:"remboursements",  title: 'Remboursements', type: 'link' },
            { path: '/sales/mobile-pay', id:"mobilemoney", title: 'Mobile Money', type: 'link' }
        ]
    },
    {
        title: 'Approvisionnement', icon: Download, type: 'sub', active: false, children: [
            {
                title: 'Monnaies', type: 'sub', active: false, children: [
                    { path: '/supply/currency/list-currency', id:"listeApproMonnaie",  title: 'Monnaies approvisionnées', type: 'link' },
                    { path: '/supply/currency/create-currency', id:"ajouterApproMonnaie", title: 'Ajout de monnaie', type: 'link' },
                ]
            },
            {
                title: 'Produits', type: 'sub', active: false, children: [
                    { path: '/supply/products/list-product', id:"listeApproProduit", title: 'Produits approvisionnés', type: 'link' },
                    { path: '/supply/products/create-product', id:"ajouterApproProduit", title: 'Créer un Produit', type: 'link' },
                ]
            }
        ]
    },
    // {
    //     title: 'Coupons', icon: Tag, type: 'sub', active: false, children: [
    //         { path: '/coupons/list-coupons', title: 'List Coupons', type: 'link' },
    //         { path: '/coupons/create-coupons', title: 'Create Coupons', type: 'link' },
    //     ]
    // },
    // {
    //     title: 'Pages', icon: Clipboard , type: 'sub', active: false, children: [
    //         { path: '/pages/list-page', title: 'List Page', type: 'link' },
    //         { path: '/pages/create-page', title: 'Create Page', type: 'link' },
    //     ]
    // },
    // {
    //     title: 'Media', path: '/media', icon: Camera, type: 'link', active: false
    // },
    // {
    //     title: 'Menus', icon: AlignLeft, type: 'sub', active: false, children: [
    //         { path: '/menus/list-menu', title: 'List Menu', type: 'link' },
    //         { path: '/menus/create-menu', title: 'Create Menu', type: 'link' },
    //     ]
    // },
    {
        title: 'Machine', icon: Server, type: 'sub', active: false, children: [
            { path: '/machines/list-machine', id:"listeMachine", title: 'Liste des Machines', type: 'link' },
            { path: '/machines/create-machine', id:"ajouterMachine", title: 'Créer une machine', type: 'link' },
        ]
    },
    {
        title: 'Maintenance', icon: Loader, type: 'sub', active: false, children: [
            { path: '/maintains/list-maintain', id:"listeMaintenance", title: 'Liste des Maintenances', type: 'link' },
            { path: '/maintains/create-maintain', id:"ajouterMaintenance", title: 'Créer une Maintenance', type: 'link' },
        ]
    },
    {
        title: 'Slides', icon: Sliders, type: 'sub', active: false, children: [
            { path: '/slides/list-slide', id:"listeSlide", title: 'Liste des Slides', type: 'link' },
            { path: '/slides/create-slide', id:"ajouterSlide", title: 'Créer un Slide', type: 'link' },
        ]
    },
    {
        title: 'Logs',path:'/logs/Log', id:"log", icon: Archive, type: 'link', active: false
    },

    // {
    //     title: 'Vendors', icon: Users, type: 'sub', active: false, children: [
    //         { path: '/vendors/list_vendors', title: 'Vendor List', type: 'link' },
    //         { path: '/vendors/create-vendors', title: 'Create Vendor', type: 'link' },
    //     ]
    // },
    // {
    //     title: 'Localization', icon: Chrome, type: 'sub', children: [
    //         { path: '/localization/transactions', title: 'Translations', type: 'link' },
    //         { path: '/localization/currency-rates', title: 'Currency Rates', type: 'link' },
    //         { path: '/localization/taxes', title: 'Taxes', type: 'link' }
    //     ]
    // },
    {
        title: 'Statistiques',path:'/reports/report', id:"statistique", icon: BarChart, type: 'link', active: false
    },
    {
        title: 'Utilisateurs', icon: Users, type: 'sub', active: false, children: [
            { path: '/users/list-user', id:"listeUtilisateur", title: 'Liste des Utilisateurs', type: 'link' },
            { path: '/users/create-user', id:"ajouterUtilisateur", title: 'Créer un Utilisateur', type: 'link' },
        ]
    },
    {
        title: 'Rôles', icon: UserPlus, type: 'sub', active: false, children: [
            { path: '/roles/roles-list', id:"listeRole", title: 'Liste des Rôles', type: 'link' },
            { path: '/roles/add-roles', id:"ajouterRole", title: 'Ajouter un rôle', type: 'link' },
            // { path: '/roles/change-roles', title: 'Modifier un rôle', type: 'link' },
        ]
    },
    {
        title: 'Paramètres', icon: Settings, type: 'sub', children: [
            // { path: '/settings/profile', title: 'Profil', type: 'link' },
            // { path: '/settings/change-profile', title: 'Modifier le Profil', type: 'link' },
            { path: '/settings/change-password', title: 'Modifier le Mot de Passe', type: 'link' },
        ]
    },
    // {
    //     title: 'Invoice',path:'/invoice', icon: Archive, type: 'link', active: false
    // },
    // {
    //     title: 'Login',path:'/auth/login', icon: LogIn, type: 'link', active: false
    // }
]
