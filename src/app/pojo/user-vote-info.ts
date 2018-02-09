export class UserVoteInfo {

  amountFavours: number;
  amountTreads: number;
  blogFavourMap: Map;
  blogTreadMap: Map;

  constructor() {
     this.amountFavours = 0;
     this.amountTreads = 0;
  }

}
interface IHash {
  [details: number]: number;
}

class Map {
  data: Array<IHash>;
}
