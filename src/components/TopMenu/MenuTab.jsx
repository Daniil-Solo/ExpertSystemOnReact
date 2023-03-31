function MenuTab(props) {
    const {title, value, isActive, changeCurrentTabIndex} = props;
    const activeTabStyles = {
        backgroundColor: "#115293",
        color: "#FFFFFF"
    }
    const nonactiveTabStyles = {
        backgroundColor: "transparent",
        color: "#000000"
    }
    const tabStyle = isActive? activeTabStyles: nonactiveTabStyles;
    return (
        <p style={{...tabStyle, padding: "4px 24px", marginBottom: "0", borderTopLeftRadius: "4px", borderTopRightRadius: "4px", cursor: "pointer"}} onClick={() => changeCurrentTabIndex(value)}>
            {title}
        </p>
    );
  }
  
export default MenuTab;