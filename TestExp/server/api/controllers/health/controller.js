export class Controller {
  health(req, res) {
    return res.json( {version: '1.0'} );
  }
}
export default new Controller();
