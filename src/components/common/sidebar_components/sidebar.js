import React, { Component, Fragment } from 'react'
import User_panel from './user-panel';
import { Link } from 'react-router-dom';
import { MENUITEMS } from '../../../constants/menu';
import * as roleActions  from "../../../redux/actions/roleActions";
import { connect } from 'react-redux';  

// image import
import logo from '../../../assets/images/dashboard/mini-autoprice.png'

// const this.state.mainmenu = []
export class sidebar extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            selectedPath: "1", 
            mainmenu: []
        }
        
    }

    // state = {  };
    onItemSelection = (arg, e) => {
        this.setState({ selectedPath: arg.path });
    };

    componentWillMount() {
        this.setState({
            mainmenu: MENUITEMS
        })
    }

    componentDidMount() {
        var currentUrl = window.location.pathname;
        this.props.actionsdetailRole(localStorage.getItem('roles'));

        setTimeout(() =>{
            // console.log(this.state.mainmenu)
            // this.state.mainmenu[1].children
            // console.log(this.state.mainmenu)
            console.log(this.props.roledetails.role[0])
            if(this.props.roledetails.role[0].dashboard != '1'){
                // console.log(this.state.mainmenu);
                this.state.mainmenu.splice(0,1);
                
                // Role du Menu Produits
                if(this.props.roledetails.role[0].listeCategorie != '1'){
                    this.state.mainmenu[0].children.splice(0,1);
                    if(this.props.roledetails.role[0].listeProduit != '1'){
                        this.state.mainmenu[0].children.splice(0,1)
                        if(this.props.roledetails.role[0].ajouterProduit != '1'){
                            this.state.mainmenu[0].children.splice(0,1)
                        }
                    }else{
                        if(this.props.roledetails.role[0].ajouterProduit != '1'){
                            this.state.mainmenu[0].children.splice(1,1)
                        }
                    }     
                }else{
                    if(this.props.roledetails.role[0].listeProduit != '1'){
                        this.state.mainmenu[0].children.splice(1,1)
                        if(this.props.roledetails.role[0].ajouterProduit != '1'){
                            this.state.mainmenu[0].children.splice(1,1)
                        }
                    }else{
                        if(this.props.roledetails.role[0].ajouterProduit != '1'){
                            this.state.mainmenu[0].children.splice(2,1)
                        }
                    }
                    
                }
           
                // Role du Menu Ventes
                if(this.props.roledetails.role[0].commandes != '1'){
                    this.state.mainmenu[1].children.splice(0,1);
                    if(this.props.roledetails.role[0].paiements != '1'){
                        this.state.mainmenu[1].children.splice(0,1);
                        if(this.props.roledetails.role[0].remboursements != '1'){
                            this.state.mainmenu[1].children.splice(0,1);
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[1].children.splice(0,1);
                            }
                        }else{
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[1].children.splice(1,1);
                            }
                        }
                    }else{
                        if(this.props.roledetails.role[0].remboursements != '1'){
                            this.state.mainmenu[1].children.splice(1,1);
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[1].children.splice(1,1);
                            }
                        }else{
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[1].children.splice(2,1);
                            } 
                        }
                    }
                }else{
                    if(this.props.roledetails.role[0].paiements != '1'){
                        this.state.mainmenu[1].children.splice(1,1);
                        if(this.props.roledetails.role[0].remboursements != '1'){
                            this.state.mainmenu[1].children.splice(1,1);
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[1].children.splice(1,1);
                            }
                        }else{
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[1].children.splice(2,1);
                            }
                        }
                    }else{
                        if(this.props.roledetails.role[0].remboursements != '1'){
                            this.state.mainmenu[1].children.splice(2,1);
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[1].children.splice(2,1);
                            }
                        }else{
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[1].children.splice(3,1);
                            } 
                        }
                    }
                }

                // Role du Menu Approvisionnements
                if(this.props.roledetails.role[0].listeApproMonnaie != '1'){
                    this.state.mainmenu[2].children[0].children.splice(0,1)
                    if(this.props.roledetails.role[0].ajouterApproMonnaie != '1'){
                        this.state.mainmenu[2].children[0].children.splice(0,1)
                    }
                }else{
                    if(this.props.roledetails.role[0].ajouterApproMonnaie != '1'){
                        this.state.mainmenu[2].children[0].children.splice(1,1)
                    }
                }
                if(this.props.roledetails.role[0].listeApproProduit != '1'){
                    this.state.mainmenu[2].children[1].children.splice(0,1);
                    if(this.props.roledetails.role[0].ajouterApproProduit != '1'){
                        this.state.mainmenu[2].children[1].children.splice(0,1);
                    }
                }else{
                    if(this.props.roledetails.role[0].ajouterApproProduit != '1'){
                        this.state.mainmenu[2].children[1].children.splice(1,1);
                    }
                }

                // Role du Menu Machines
                if(this.props.roledetails.role[0].listeMachine != '1'){
                    this.state.mainmenu[3].children.splice(0,1)
                    if(this.props.roledetails.role[0].ajouterMachine != '1'){
                        this.state.mainmenu[3].children.splice(0,1)
                    }
                }else{
                    if(this.props.roledetails.role[0].ajouterMachine != '1'){
                        this.state.mainmenu[3].children.splice(1,1)
                    }
                }

                // Role du Menumaintenances
                if(this.props.roledetails.role[0].listeMaintenance != '1'){
                    this.state.mainmenu[4].children.splice(0,1)
                    if(this.props.roledetails.role[0].ajouterMaintenance != '1'){
                        this.state.mainmenu[4].children.splice(0,1)
                    }
                }else{
                    if(this.props.roledetails.role[0].ajouterMaintenance != '1'){
                        this.state.mainmenu[4].children.splice(1,1)
                    }
                }
                
                // Role du Menu Slides
                if(this.props.roledetails.role[0].listeSlide != '1'){
                    this.state.mainmenu[5].children.splice(0,1)
                    if(this.props.roledetails.role[0].ajouterSlide != '1'){
                        this.state.mainmenu[5].children.splice(0,1)
                    }
                }else{
                    if(this.props.roledetails.role[0].ajouterSlide != '1'){
                        this.state.mainmenu[5].children.splice(1,1)
                    }
                }

                // Roles des Menu Log, Statistiques, utilisateurs, roles
                if(this.props.roledetails.role[0].log != '1'){
                    this.state.mainmenu.splice(6,1);
                    if(this.props.roledetails.role[0].statistique != '1'){
                        this.state.mainmenu.splice(6,1);
                        if(this.props.roledetails.role[0].listeUtilisateur != '1'){
                            this.state.mainmenu[6].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[6].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[6].children.splice(1,1)
                            }
                        }

                        if(this.props.roledetails.role[0].listeRole != '1'){
                            this.state.mainmenu[7].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[7].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[7].children.splice(1,1)
                            }
                        }
                    }else{
                        if(this.props.roledetails.role[0].listeUtilisateur != '1'){
                            this.state.mainmenu[7].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[7].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[7].children.splice(1,1)
                            }
                        }

                        if(this.props.roledetails.role[0].listeRole != '1'){
                            this.state.mainmenu[8].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[8].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[8].children.splice(1,1)
                            }
                        }
                    }
                }else{
                    if(this.props.roledetails.role[0].statistique != '1'){
                        this.state.mainmenu.splice(7,1);
                        if(this.props.roledetails.role[0].listeUtilisateur != '1'){
                            this.state.mainmenu[7].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[7].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[7].children.splice(1,1)
                            }
                        }

                        if(this.props.roledetails.role[0].listeRole != '1'){
                            this.state.mainmenu[8].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[8].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[8].children.splice(1,1)
                            }
                        }
                    }else{
                        if(this.props.roledetails.role[0].listeUtilisateur != '1'){
                            this.state.mainmenu[8].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[8].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[8].children.splice(1,1)
                            }
                        }

                        if(this.props.roledetails.role[0].listeRole != '1'){
                            this.state.mainmenu[9].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[9].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[9].children.splice(1,1)
                            }
                        }
                    }
                }

               
            }else{
                // console.log(this.state.mainmenu);
                // Roles du Menu Produits
                if(this.props.roledetails.role[0].listeCategorie != '1'){
                    this.state.mainmenu[1].children.splice(0,1);
                    if(this.props.roledetails.role[0].listeProduit != '1'){
                        this.state.mainmenu[1].children.splice(0,1)
                        if(this.props.roledetails.role[0].ajouterProduit != '1'){
                            this.state.mainmenu[1].children.splice(0,1)
                        }
                    }else{
                        if(this.props.roledetails.role[0].ajouterProduit != '1'){
                            this.state.mainmenu[1].children.splice(1,1)
                        }
                    }     
                }else{
                    if(this.props.roledetails.role[0].listeProduit != '1'){
                        this.state.mainmenu[1].children.splice(1,1)
                        if(this.props.roledetails.role[0].ajouterProduit != '1'){
                            this.state.mainmenu[1].children.splice(1,1)
                        }
                    }else{
                        if(this.props.roledetails.role[0].ajouterProduit != '1'){
                            this.state.mainmenu[1].children.splice(2,1)
                        }
                    }
                    
                }
           
                // Roles du Menu Ventes
                if(this.props.roledetails.role[0].commandes != '1'){
                    this.state.mainmenu[2].children.splice(0,1);
                    if(this.props.roledetails.role[0].paiements != '1'){
                        this.state.mainmenu[2].children.splice(0,1);
                        if(this.props.roledetails.role[0].remboursements != '1'){
                            this.state.mainmenu[2].children.splice(0,1);
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[2].children.splice(0,1);
                            }
                        }else{
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[2].children.splice(1,1);
                            }
                        }
                    }else{
                        if(this.props.roledetails.role[0].remboursements != '1'){
                            this.state.mainmenu[2].children.splice(1,1);
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[2].children.splice(1,1);
                            }
                        }else{
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[2].children.splice(2,1);
                            } 
                        }
                    }
                }else{
                    if(this.props.roledetails.role[0].paiements != '1'){
                        this.state.mainmenu[2].children.splice(1,1);
                        if(this.props.roledetails.role[0].remboursements != '1'){
                            this.state.mainmenu[2].children.splice(1,1);
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[2].children.splice(1,1);
                            }
                        }else{
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[2].children.splice(2,1);
                            }
                        }
                    }else{
                        if(this.props.roledetails.role[0].remboursements != '1'){
                            this.state.mainmenu[2].children.splice(2,1);
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[2].children.splice(2,1);
                            }
                        }else{
                            if(this.props.roledetails.role[0].mobileMoney != '1'){
                                this.state.mainmenu[2].children.splice(3,1);
                            } 
                        }
                    }
                }

                // Roles du Menu Approvisionnements
                if(this.props.roledetails.role[0].listeApproMonnaie != '1'){
                    this.state.mainmenu[3].children[0].children.splice(0,1)
                    if(this.props.roledetails.role[0].ajouterApproMonnaie != '1'){
                        this.state.mainmenu[3].children[0].children.splice(0,1)
                    }
                }else{
                    if(this.props.roledetails.role[0].ajouterApproMonnaie != '1'){
                        this.state.mainmenu[3].children[0].children.splice(1,1)
                    }
                }
                if(this.props.roledetails.role[0].listeApproProduit != '1'){
                    this.state.mainmenu[3].children[1].children.splice(0,1);
                    if(this.props.roledetails.role[0].ajouterApproProduit != '1'){
                        this.state.mainmenu[3].children[1].children.splice(0,1);
                    }
                }else{
                    if(this.props.roledetails.role[0].ajouterApproProduit != '1'){
                        this.state.mainmenu[3].children[1].children.splice(1,1);
                    }
                }

                // Roles du Menu Machines
                if(this.props.roledetails.role[0].listeMachine != '1'){
                    this.state.mainmenu[4].children.splice(0,1)
                    if(this.props.roledetails.role[0].ajouterMachine != '1'){
                        this.state.mainmenu[4].children.splice(0,1)
                    }
                }else{
                    if(this.props.roledetails.role[0].ajouterMachine != '1'){
                        this.state.mainmenu[4].children.splice(1,1)
                    }
                }

                // Roles du Menu Maintenances
                if(this.props.roledetails.role[0].listeMaintenance != '1'){
                    this.state.mainmenu[5].children.splice(0,1)
                    if(this.props.roledetails.role[0].ajouterMaintenance != '1'){
                        this.state.mainmenu[5].children.splice(0,1)
                    }
                }else{
                    if(this.props.roledetails.role[0].ajouterMaintenance != '1'){
                        this.state.mainmenu[5].children.splice(1,1)
                    }
                }
                
                // Roles du Menu Slides
                if(this.props.roledetails.role[0].listeSlide != '1'){
                    this.state.mainmenu[6].children.splice(0,1)
                    if(this.props.roledetails.role[0].ajouterSlide != '1'){
                        this.state.mainmenu[6].children.splice(0,1)
                    }
                }else{
                    if(this.props.roledetails.role[0].ajouterSlide != '1'){
                        this.state.mainmenu[6].children.splice(1,1)
                    }
                }

                // Roles des Menu Log, Statistiques, utilisateurs, roles
                if(this.props.roledetails.role[0].log != '1'){
                    
                    this.state.mainmenu.splice(7,1);
                    if(this.props.roledetails.role[0].statistique != '1'){
                        this.state.mainmenu.splice(7,1);
                        if(this.props.roledetails.role[0].listeUtilisateur != '1'){
                            this.state.mainmenu[7].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[7].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[7].children.splice(1,1)
                            }
                        }

                        if(this.props.roledetails.role[0].listeRole != '1'){
                            this.state.mainmenu[8].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[8].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[8].children.splice(1,1)
                            }
                        }
                    }else{
                        if(this.props.roledetails.role[0].listeUtilisateur != '1'){
                            this.state.mainmenu[8].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[8].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[8].children.splice(1,1)
                            }
                        }

                        if(this.props.roledetails.role[0].listeRole != '1'){
                            this.state.mainmenu[9].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[9].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[9].children.splice(1,1)
                            }
                        }
                    }
                }else{
                    // console.log(this.state.mainmenu);
                    if(this.props.roledetails.role[0].statistique != '1'){
                        this.state.mainmenu.splice(8,1);
                        if(this.props.roledetails.role[0].listeUtilisateur != '1'){
                            this.state.mainmenu[8].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[8].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[8].children.splice(1,1)
                            }
                        }

                        if(this.props.roledetails.role[0].listeRole != '1'){
                            this.state.mainmenu[9].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[9].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[9].children.splice(1,1)
                            }
                        }
                    }else{
                        if(this.props.roledetails.role[0].listeUtilisateur != '1'){
                            this.state.mainmenu[9].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[9].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterUtilisateur != '1'){
                                this.state.mainmenu[9].children.splice(1,1)
                            }
                        }

                        if(this.props.roledetails.role[0].listeRole != '1'){
                            this.state.mainmenu[10].children.splice(0,1)
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[10].children.splice(0,1)
                            }
                        }else{
                            if(this.props.roledetails.role[0].ajouterRole != '1'){
                                this.state.mainmenu[10].children.splice(1,1)
                            }
                        }
                    }
                }

            }

            console.log(this.state.mainmenu);

        },1000)

        this.state.mainmenu.filter(items => {

            if (!items.children) {
                if (items.path === currentUrl)
                    this.setNavActive(items)
                return false
            }

            items.children.filter(subItems => {
                if (subItems.path === currentUrl)
                    this.setNavActive(subItems)

                if (!subItems.children) return false
                subItems.children.filter(subSubItems => {
                    if (subSubItems.path === currentUrl)
                        this.setNavActive(subSubItems)
                })
            })
        })
    }

    setNavActive(item) {

        MENUITEMS.filter(menuItem => {
            if (menuItem != item)
                menuItem.active = false
            if (menuItem.children && menuItem.children.includes(item))
                menuItem.active = true
            if (menuItem.children) {
                menuItem.children.filter(submenuItems => {
                    if (submenuItems != item) {
                        submenuItems.active = false
                    }
                    if (submenuItems.children) {
                        submenuItems.children.map(childItem => {
                            childItem.active = false;
                        })
                        if (submenuItems.children.includes(item)) {
                            submenuItems.active = true
                            menuItem.active = true
                        }
                    }
                })
            }
        })
        item.active = !item.active

        this.setState({
            mainmenu: MENUITEMS
        })


    }

    render() {
        const theme = {
            selectionColor: "#C51162"
        };

        const mainmenu = this.state.mainmenu.map((menuItem, i) =>
            <li className={`${menuItem.active ? 'active' : ''}`} key={i}>
                {(menuItem.sidebartitle) ?
                    <div className="sidebar-title">{menuItem.sidebartitle}</div>
                    : ''}
                {(menuItem.type === 'sub') ?
                    <a className="sidebar-header " href="javascript:void(0)" onClick={() => this.setNavActive(menuItem)}>
                        <menuItem.icon />
                        <span>{menuItem.title}</span>
                        <i className="fa fa-angle-right pull-right"></i>
                    </a>
                    : ''}
                {(menuItem.type === 'link') ?
                    <Link
                        to={`${process.env.PUBLIC_URL}${menuItem.path}`}
                        className={`sidebar-header ${menuItem.active ? 'active' : ''}`}

                        onClick={() => this.setNavActive(menuItem)}
                    >
                        <menuItem.icon /><span>{menuItem.title}</span>
                        {menuItem.children ?
                            <i className="fa fa-angle-right pull-right"></i> : ''}
                    </Link>
                    : ''}
               
                {menuItem.children ?
                    <ul
                        className={`sidebar-submenu ${menuItem.active ? 'menu-open' : ''}`}
                        style={menuItem.active ? { opacity: 1, transition: 'opacity 500ms ease-in' } : {}}
                    >
                        {menuItem.children.map((childrenItem, index) =>
                            <li key={index} className={childrenItem.children ? childrenItem.active ? 'active' : '' : ''}>
                                {(childrenItem.type === 'sub') ?
                                    <a href="javascript:void(0)" onClick={() => this.setNavActive(childrenItem)} >
                                        <i className="fa fa-circle"></i>{childrenItem.title} <i className="fa fa-angle-right pull-right"></i></a>
                                    : ''}

                                {(childrenItem.type === 'link') ?
                                    <Link
                                        to={`${process.env.PUBLIC_URL}${childrenItem.path}`}
                                        className={childrenItem.active ? 'active' : ''}
                                        onClick={() => this.setNavActive(childrenItem)}
                                    >
                                        <i className="fa fa-circle"></i>{childrenItem.title} </Link>
                                    : ''}
                                {childrenItem.children ?
                                    <ul className={`sidebar-submenu ${childrenItem.active ? 'menu-open' : 'active'}`}>
                                        {childrenItem.children.map((childrenSubItem, key) =>
                                            <li className={childrenSubItem.active ? 'active' : ''} key={key}>
                                                {(childrenSubItem.type === 'link') ?
                                                    <Link
                                                        to={`${process.env.PUBLIC_URL}${childrenSubItem.path}`}
                                                        className={childrenSubItem.active ? 'active' : ''}
                                                        onClick={() => this.setNavActive(childrenSubItem)}
                                                    >
                                                        <i className="fa fa-circle"></i>{childrenSubItem.title}</Link>
                                                    : ''}
                                            </li>
                                        )}
                                    </ul>
                                    : ''}
                            </li>
                        )}
                    </ul>
                    : ''}
            </li>
        )

        return (
            <Fragment>
                <div className="page-sidebar">
                    <div className="main-header-left d-none d-lg-block">
                        <div className="logo-wrapper">
                            <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
                                <img className="blur-up lazyloaded" src={logo} alt="" />
                            </Link>
                        </div>
                    </div>
                    <div className="sidebar custom-scrollbar">
                        <User_panel />
                        <ul className="sidebar-menu">
                            {mainmenu}
                        </ul>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        roledetails: state.roledetails
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        actionsdetailRole: (rolename) => {dispatch(roleActions.actionsdetailRole(rolename))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(sidebar)
