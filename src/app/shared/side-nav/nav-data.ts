export const navbarData=[
    {
     routerLink: 'MatriceDeCompetence',
     icon: 'fal fa-chart-network', // Replaced icon class
     label: 'MatriceDeCompetence',
     link: '/Matrice',
     requiredRoles: ['TechnicienMaintenance','ResponssableUAP','ChefDeLigne','AgentFormation','IngénieurQualité','TechnicienMaintenance','ADMIN','IngénieurQualité']
 },
 {
    routerLink: 'ProgrammeDeFormation',
    icon: 'fal fa-poll-h', // Replaced icon class
    label: 'ProgrammeDeFormation',
    link: '/program',
    requiredRoles: ['TechnicienMaintenance','ResponssableUAP','ChefDeLigne','AgentFormation','IngénieurQualité','TechnicienMaintenance','ADMIN','IngénieurQualité']
},
 {
     routerLink: 'Formations',
     icon: 'fal fa-graduation-cap', // Replaced icon class
     label: 'Formations',
     link: '/Formations',
     requiredRoles: ['TechnicienMaintenance','ChefDeLigne','AgentFormation','IngénieurQualité','TechnicienMaintenance','ADMIN','AgentFormation','IngénieurQualité']
 },
 {
     routerLink: 'Operateurs',
     icon: 'fal fa-users-cog', // Replaced icon class
     label: 'Operateurs',
     link: '/Operateurs',
     requiredRoles: ['ADMIN','TechnicienMaintenance','AgentFormation','IngénieurQualité']
 },
 {
     routerLink: "Création d'une demande",
     icon: 'fal fa-plus-circle', // Replaced icon class
     label: "Création d'une demande",
     link: "/Création d'une demande",
     requiredRoles: ['DirecteurDesOperations','ADMIN','TechnicienMaintenance','DirecteurUAP','RH','AgentFormation','IngénieurQualité']
 },
 {
     routerLink: 'Evaluation de formation',
     icon: 'fal fa-poll-h', // Replaced icon class
     label: 'Evaluation de formation',
     link: '/Evaluation de formation',
     requiredRoles: ['DirecteurDesOperations','ADMIN']
 },
 {
     routerLink: 'Demandes',
     icon: 'fal fa-tasks', // Replaced icon class
     label: 'Demandes',
     link: '/Demandes',
     count: 0,
     requiredRoles: ['ADMIN','TechnicienMaintenance','AgentFormation','IngénieurQualité']
 },
 {
     routerLink: 'Fiches de formations',
     icon: 'fal fa-file-alt', // Replaced icon class
     label: 'Fiches de formations',
     link: '/Fiches de formations',
     requiredRoles: ['ADMIN','TechnicienMaintenance','IngénieurQualité']
 },
 {
     routerLink: 'Corbeille',
     icon: 'fa fa-trash', // Replaced icon class
     label: 'Corbeille',
     link: '/Corbeille',
     requiredRoles: ['DirecteurUAP','TechnicienMaintenance','ADMIN','ChefDeLigne','AgentFormation','IngénieurQualité']
 },
 {
     routerLink: 'GestionDesUtilisateurs',
     icon: 'fal fa-users-cog', // Replaced icon class
     label: 'Gestion Des Utilisateurs',
     link: '/GestionDesUtilisateurs',
     requiredRoles: ['DirecteurDesOperations','RH','DirecteurUAP','TechnicienMaintenance','ChefDeLigne','AgentFormation','IngénieurQualité','ResponssableUAP']
 },
 {
     routerLink: 'GestionDesLignes',
     icon: 'fas fa-chart-line', // Replaced icon class
     label: 'Gestion Des Lignes',
     link: '/GestionDesLignes',
     requiredRoles: ['DirecteurDesOperations','RH','DirecteurUAP','TechnicienMaintenance','ChefDeLigne','AgentFormation','IngénieurQualité','ResponssableUAP']
 },
 {
     routerLink: 'GestionDesOperations',
     icon: 'fas fa-cogs', // Replaced icon class
     label: 'Gestion Des Operations',
     link: '/GestionDesOperations',
     requiredRoles: ['DirecteurDesOperations','RH','DirecteurUAP','TechnicienMaintenance','ChefDeLigne','AgentFormation','IngénieurQualité','ResponssableUAP']
 }
 
 ]