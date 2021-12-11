const Avatar = require('avatar-builder')

module.exports.generateAvatar = async function ( string ) { 
  const avatar = Avatar.builder(
                   Avatar.Image.margin(Avatar.Image.roundedRectMask(Avatar.Image.compose(
                     Avatar.Image.randomFillStyle(),
                     Avatar.Image.shadow(Avatar.Image.margin(Avatar.Image.cat(), 8), {blur: 5, offsetX: 2.5, offsetY: -2.5,color:'rgba(0,0,0,0.75)'})
                   ), 32), 8),
                  128, 128)
  return await avatar.create( string )
} 