const u = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  heroMain: u("photo-1599785209796-786432b228bc", 900),
  heroHand: u("photo-1553135422-400ee5852b27", 600),
  heroRow: u("photo-1486427944299-d1955d23e34d", 600),
  classic: u("photo-1563729784474-d77dbb933a9e", 900),
  seasonal: u("photo-1611692276815-cd6efa0b2dac", 900),
  boxes: u("photo-1587536849024-daaa4a417b16", 900),
  vanilla: u("photo-1519869325930-281384150729", 600),
  fudge: u("photo-1603532648955-039310d9ed75", 600),
  raspberry: u("photo-1615556998978-0b65bce0db33", 600),
  lemon: u("photo-1576618148400-f54bed99fcfd", 600),
  shop: u("photo-1618652970214-19b55729f0e6", 900),
};
