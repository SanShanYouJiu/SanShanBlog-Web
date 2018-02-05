export class UserVoteInfo {

  amountFavours: number;
  amountTreads: number;
  blogFavourMap: Map;
  blogTreadMap: Map;

}
interface IHash {
  [details: number]: number;
}

class Map {
  data: Array<IHash>;
}
