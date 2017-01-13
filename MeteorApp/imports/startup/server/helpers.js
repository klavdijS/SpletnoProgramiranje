/**
 * Created by Klavdij on 08/01/2017.
 */
import {Matches} from '../../api/matches/matches.js';
import {MatchesData} from '../../api/matchesData/matchesData.js';

export let Helper = {

    prepareUrl: (refereeName,refereeSurname) => {
        return "?name="+refereeName+"&surname="+refereeSurname;
    },
    insertMatchesIntoDB : (data)=>{

        _.each(data.result,(match,index)=>{
            if (Matches.findOne({_id:match._id})) {
                console.log("Match already in DB");
            } else {
                Matches.insert(match);
            }
        })
    },
    updateMatchData: (match) => {
        MatchesData.upsert({userId:match.user,matchId:match.matchId},
            {$set:
                {userId: match.user,
                    matchId: match.matchId,
                    comment: match.comment,
                    mileage: match.mileage,
                    dailyAmount: match.dailyAmount
                }
            });
    }
};