interface Settings {
    /**
     * Overrides the default title
     */
    title: string;
    /**
     * Controls settings panel display
     */
    showSettings: boolean;
    /**
     * Controls sidebar logo display
     */
    sidebarLogo: boolean;
    /**
     * If true, will fix the header component
     */
    fixedHeader: boolean;
}

const settings: Settings = {
    title: 'Vue Typescript Admin',
    showSettings: true,
    sidebarLogo: false,
    fixedHeader: false,
};

export default settings;
