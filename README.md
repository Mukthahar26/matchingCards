# matchingCards



# menu sound
https://www.soundeffectsplus.com/product/menu-button-click-double-11/


# chipttt (using)
https://www.soundeffectsplus.com/product/menu-button-click-snap-08/

# images downloaded from 
https://uxwing.com/panda-icon/


item.isOpen ? <TouchableOpacity style={styles.cardbtn} activeOpacity={1} onPress={()=> this.flipped(item.id, index)}><Image style={styles.image} resizeMode="contain" source={require("./../../../assets/heartcard.jpg")} /></TouchableOpacity> : <TouchableOpacity activeOpacity={1} style={{...styles.cardbtn, backgroundColor:'white'}} onPress={()=> this.flipped(item.id, index)}><Image style={{...styles.image}} resizeMode="contain" source={{uri: item.image}} /></TouchableOpacity>