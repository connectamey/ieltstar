// import '../../../pages/quizstyles/Paragraph.scss';
import React, {Component} from 'react';
import styles from '../../../styles/quizstyles/Paragraph.module.scss';
//Demo component for showing demo paragraph
class Paragraph extends Component {
    render() {
        return(
            <div className={styles.Paragraph_content}>
            <h3 className={styles.Paragraph_title}>When the flip of a coin wins an election</h3>
            (A) In the first vote to decide the US's presidential candidates, several results were decided on the toss of a coin. How common is it for elections to be decided this way? A silver coin balanced on thumb and forefinger is pinged upwards, falls, then gives its verdict - heads or tails. In sport, it's a common practice to decide who kicks off or opens the batting. In elections it's rarer, but not as rare as you might suppose. In Iowa's Democratic caucuses - a contest between Hillary Clinton and Bernie Sanders for the party's presidential nomination - the results in several precincts were decided by flipping a coin, according to the Des Moines Register.
            <br/><br/>(B) It was a series of dramatic finishes in a race the party called "the closest in Iowa Democratic caucus history". On Twitter there were reports that contests were settled in this way in Ames, one Des Moines precinct, another Des Moines precinct, Newton, West Branch and West Davenport. In some of these cases it was reported that there was a dead heat in voting. In Ames, it was the vagaries of the voting system and the decision by 60 of those present not to vote that left the final result unclear. Party officials were contacted on a hotline to advise, and recommended tossing a coin.
            <br/><br/>(C) Unusually, all six coin tosses were won by Clinton. According to John Moriarty, Reader in Mathematics at Queen Mary University London, there would have been a one-in-64 or 1.6% chance of Clinton winning all six flips. (That's nothing, however, compared to the time the England cricket team lost 12 tosses of the coin in a row - a probability of about 4,000-to-one.) The caucus system used in 10 US states, American Samoa and the Virgin Islands, differs from the primary system used in most states in that votes are taken in small groups rather than on a statewide basis. This makes ties more likely.
            <br/><br/>(D) "It's quite an idiosyncratic process," says Rene Lindstaedt, an expert on US politics at the University of Essex. Unlike in primaries, which are conducted like ballots, Democratic caucus-goers in Iowa show their support for candidates by standing or sitting together in "preference groups" before a head count is taken (Iowa Republicans use secret ballots or a show of hands).
            <br/><br/>(E) The Iowa Democratic party's caucus guide states that "where two or more preference groups are tied for the loss of a delegate, a coin shall be tossed to determine who loses the delegate". With the statewide result a virtual tie between Clinton and Sanders, the flips became one of the night's biggest talking points, and within hours the coin had its own Twitter profile.
            <br/><br/>(F) It's not unprecedented for elections to be decided in this manner. The mayor of San Teodoro, a town in the central Philippines, was ultimately chosen by a coin toss in 2013 after two rival candidates both received 3,236 votes apiece. In the UK, returning officers are legally obliged to settle elections immediately if recounts fail to establish a winner. This has never happened in an election to the House of Commons, but it has in local elections.
            <br/><br/>(G) Worksop North East seat in Bassetlaw District Council was won by Labour on the toss of a coin in 2000 after three recounts. Christopher Underwood-Frost, a Conservative councillor in Lincolnshire held his seat by the toss of a coin in 2007. And control of Stirling District Council was decided by cutting a deck of cards on two occasions in 1988 and 1992. There are other uses for coin flips, too. Government contracts in Canada can be awarded this way if tenders are identical.
            <br/><br/>(H) But there remains unease about the use of making decisions so arbitrarily - even in sport, where the use of coin tosses is perhaps best established. From 2016, under an England and Wales Cricket Board (ECB) trial, visiting county teams will be given the option of bowling first, and a coin toss will only take place if they decline. Perhaps the ECB will share its findings with Iowa's Democratic Party.
          </div>
        );
    }
}

export default Paragraph;

