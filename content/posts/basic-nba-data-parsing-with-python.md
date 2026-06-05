---
title: "Basic NBA Data Parsing with Python"
slug: "basic-nba-data-parsing-with-python"
publishedAt: "2022-10-03"
excerpt: "About eight weeks ago I saw John Capobianco and Tim Bert were holding an online meeting about trying to pull down some NCAA football data using an API. I, myself, finally finished up the last certification exam I've had..."
author: "Andy Lapteff"
---

About eight weeks ago I saw John Capobianco and Tim Bert were holding an online meeting about trying to pull down some NCAA football data using an API. I, myself, finally finished up the last certification exam I've had on my plate shortly thereafter. Since then, I've taken to doing a little bit of [DataCamp](https://app.datacamp.com/learn) and [CloudAcademy](http://cloudacademy.com) each day.

DataCamp has a python track that teaches you the basics of python while adding in some packages a data scientist may use along the way, specifically, numpy and pandas. I'm square in the middle of DataCamp's 'intermediate python' course.

Then, like a shower whose water never gets warm, I thought to myself, why not try and do some stuff with NBA data while going through the examples and practice during the course. So here we are :)

As the title says, this is going to be 'basic' as i'm just beginning and truth be told, i'll prob do some non best practices going forward in this post. This is what learning in public looks like.

## Getting Some Data

If I'm going to parse some data using what I've been presented thus far in my training, I need some data. In my current lesson we are doing basic data parsing with pandas series objects and pandas dataframe objects. I took to the googleverse and found an interesting [github repo](https://github.com/swar/nba_api). This python package was created to make it easier to interact with stats.nba.com APIs. To install:

```
pip install nba_api pandas requests
```

From here it's all about figuring out a bit from the documentation found on the github I linked above. Jimmy Butler is my current favorite NBA basketball player so the first thing I need to find out is his PLAYER\_ID so I can use it to get further info on him.

```
>>> from nba_api.stats.static import players
>>> players.find_players_by_full_name('jimmy butler')
[{'id': 202710, 'full_name': 'Jimmy Butler', 'first_name': 'Jimmy', 'last_name': 'Butler', 'is_active': True}]
```

From the output, we can see that Jimmy Butler's 'id' is 202710. I'll use this when making my next call:

```
>>> from nba_api.stats.endpoints import playercareerstats
>>> Jimmy = playercareerstats.PlayerCareerStats(player_id=202710)
>>> print(type(Jimmy))
<class 'nba_api.stats.endpoints.playercareerstats.PlayerCareerStats'>
```

So, at this point we are almost there, just a little bit more mangling and we will get to the types of objects I need...I'm going to use the get\_data\_frames() function included in the nba\_api and select the first table in this object with the '[0]' and assign this to the variable 'jimmy\_panda':

```
>>> jimmy_panda = Jimmy.get_data_frames()[0]
>>> print(type(jimmy_panda))
<class 'pandas.core.frame.DataFrame'>
>>> print(jimmy_panda)
    PLAYER_ID SEASON_ID LEAGUE_ID     TEAM_ID TEAM_ABBREVIATION  PLAYER_AGE  GP  GS     MIN  ...  OREB  DREB  REB  AST  STL  BLK  TOV   PF   PTS
0      202710   2011-12        00  1610612741               CHI        22.0  42   0   359.0  ...    23    33   56   14   11    5   14   20   109
1      202710   2012-13        00  1610612741               CHI        23.0  82  20  2134.0  ...   136   192  328  115   78   31   62   97   705
2      202710   2013-14        00  1610612741               CHI        24.0  67  67  2591.0  ...    87   243  330  175  127   36  102  106   878
3      202710   2014-15        00  1610612741               CHI        25.0  65  65  2513.0  ...   114   265  379  212  114   36   93  108  1301
4      202710   2015-16        00  1610612741               CHI        26.0  67  67  2474.0  ...    79   279  358  321  110   43  132  124  1399
5      202710   2016-17        00  1610612741               CHI        27.0  76  75  2809.0  ...   129   341  470  417  143   32  159  112  1816
6      202710   2017-18        00  1610612750               MIN        28.0  59  59  2164.0  ...    79   235  314  288  116   24  108   78  1307
7      202710   2018-19        00  1610612750               MIN        29.0  10  10   361.0  ...    16    36   52   43   24   10   14   18   213
8      202710   2018-19        00  1610612755               PHI        29.0  55  55  1824.0  ...   105   185  290  220   99   29   81   93  1002
9      202710   2018-19        00           0               TOT        29.0  65  65  2185.0  ...   121   221  342  263  123   39   95  111  1215
10     202710   2019-20        00  1610612748               MIA        30.0  58  58  1959.0  ...   106   280  386  350  103   32  127   81  1157
11     202710   2020-21        00  1610612748               MIA        31.0  52  52  1745.0  ...    94   265  359  369  108   18  109   71  1116
12     202710   2021-22        00  1610612748               MIA        32.0  57  57  1931.0  ...   102   234  336  312   94   27  121   88  1219

[13 rows x 27 columns]
```

Alright. We made it.

## Finding Out Some Basic Info About our Data

Alright, above it says at the end of the output we have 13 rows x 27 columns. We definitely see the 13 rows but we don't see anywhere close to 27 columns. Let's see how we can see what the 27 column headers are, to do this i'm going to [dtypes](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.dtypes.html) to see the info about each column in the table as shown:

```
>>> jimmy_panda.dtypes
PLAYER_ID              int64
SEASON_ID             object
LEAGUE_ID             object
TEAM_ID                int64
TEAM_ABBREVIATION     object
PLAYER_AGE           float64
GP                     int64
GS                     int64
MIN                  float64
FGM                    int64
FGA                    int64
FG_PCT               float64
FG3M                   int64
FG3A                   int64
FG3_PCT              float64
FTM                    int64
FTA                    int64
FT_PCT               float64
OREB                   int64
DREB                   int64
REB                    int64
AST                    int64
STL                    int64
BLK                    int64
TOV                    int64
PF                     int64
PTS                    int64
dtype: object
```

So this table we have is kind of exciting, at least for a first go at this, am I right?! We can now select to print off only certain columns in the output or slice only specific years of Jimmy Butler's career or both. One way to do this is to use pandas and make sure the object we are dealing with is a DataFrame, allowing us to use all the options assoicated with this object type. Let's see how we can accomplish this:

```
>>> pd.DataFrame(data=Jimmy.get_data_frames()[0], columns=['SEASON_ID', 'PTS', 'AST'])
   SEASON_ID   PTS  AST
0    2011-12   109   14
1    2012-13   705  115
2    2013-14   878  175
3    2014-15  1301  212
4    2015-16  1399  321
5    2016-17  1816  417
6    2017-18  1307  288
7    2018-19   213   43
8    2018-19  1002  220
9    2018-19  1215  263
10   2019-20  1157  350
11   2020-21  1116  369
12   2021-22  1219  312

###
Above we basically changed the Jimmy object into the Data
Frame object we want to play with.  It's the same as doing
what's below because we've already assigned 'jimmy_panda' and
made sure it was a Pandas Data Frame
###

>>> pd.DataFrame(data=jimmy_panda, columns=['SEASON_ID', 'PTS', 'AST'])
   SEASON_ID   PTS  AST
0    2011-12   109   14
1    2012-13   705  115
2    2013-14   878  175
3    2014-15  1301  212
4    2015-16  1399  321
5    2016-17  1816  417
6    2017-18  1307  288
7    2018-19   213   43
8    2018-19  1002  220
9    2018-19  1215  263
10   2019-20  1157  350
11   2020-21  1116  369
12   2021-22  1219  312
```

Or, an even simpler way to select columns, since we know 'jimmy\_panda' is of the data type we need:

```
>>> print(jimmy_panda[['SEASON_ID', 'PTS', 'AST']])
   SEASON_ID   PTS  AST
0    2011-12   109   14
1    2012-13   705  115
2    2013-14   878  175
3    2014-15  1301  212
4    2015-16  1399  321
5    2016-17  1816  417
6    2017-18  1307  288
7    2018-19   213   43
8    2018-19  1002  220
9    2018-19  1215  263
10   2019-20  1157  350
11   2020-21  1116  369
12   2021-22  1219  312
```

Alright, that was fun, let's see how we can slice a specific year (row) out of this chart (how did i figure out how to do this you ask, I checked the [pandas loc docs](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.loc.html)):

```
>>> jimmy_panda.loc[jimmy_panda.index[[12]], ['SEASON_ID', 'PTS', 'AST']]
   SEASON_ID   PTS  AST
12   2021-22  1219  312
```

## Let's Compare

Now that we've seen we can pull out specific columns, rows and the like, we can now decide to do so based on certain thresholds. For example, it maybe useful to know only the years Jimmy Butler shot over 30% from 3-point range.

The first step we need to do is figure out which column we will be using to do our comparison, specifically, which column represents 3 point percentage. We can scroll up and look at the output of our dtypes command or do it again:

```
>>> jimmy_panda.dtypes
PLAYER_ID              int64
SEASON_ID             object
LEAGUE_ID             object
TEAM_ID                int64
TEAM_ABBREVIATION     object
PLAYER_AGE           float64
GP                     int64
GS                     int64
MIN                  float64
FGM                    int64
FGA                    int64
FG_PCT               float64
FG3M                   int64
FG3A                   int64
FG3_PCT              float64
FTM                    int64
FTA                    int64
FT_PCT               float64
OREB                   int64
DREB                   int64
REB                    int64
AST                    int64
STL                    int64
BLK                    int64
TOV                    int64
PF                     int64
PTS                    int64
dtype: object
```

Alright, we can see we will be working with the 'FG3\_PCT' which is the object type float. Next let's check out the specific values we will be comparing, specifically, we are going to check which years Jimmy Butler shot the 3-ball better than 30%.

```
>>> jimmy_panda.loc[:,"FG3_PCT"]
0     0.182
1     0.381
2     0.283
3     0.378
4     0.312
5     0.367
6     0.350
7     0.378
8     0.338
9     0.347
10    0.244
11    0.245
12    0.233
Name: FG3_PCT, dtype: float64
```

Alright, now to see which years he shot beyond 30%; to do this we will simply add the operator at the end of the statement above:

```
>>> jimmy_panda.loc[:,"FG3_PCT"] > 0.300
0     False
1      True
2     False
3      True
4      True
5      True
6      True
7      True
8      True
9      True
10    False
11    False
12    False
Name: FG3_PCT, dtype: bool
```

Every 'True' is when Jimmy shot better than 30% and every false is when he failed to do so. Next, i'll show a series of commands. First, i'll assign the variable FG3\_is\_good to the comparison and then use that variable as an index. Lastly I'll use the value\_counts() function to see how many 'True' or 'False' in total, so you can see how many years he was better than 30% and how many years he was not.

```
>>> FG3_is_good = jimmy_panda.loc[:,"FG3_PCT"] > 0.300
>>> print(type(FG3_is_good))
<class 'pandas.core.series.Series'>

>>> jimmy_panda[FG3_is_good]
   PLAYER_ID SEASON_ID LEAGUE_ID     TEAM_ID TEAM_ABBREVIATION  PLAYER_AGE  GP  GS     MIN  ...  OREB  DREB  REB  AST  STL  BLK  TOV   PF   PTS
1     202710   2012-13        00  1610612741               CHI        23.0  82  20  2134.0  ...   136   192  328  115   78   31   62   97   705
3     202710   2014-15        00  1610612741               CHI        25.0  65  65  2513.0  ...   114   265  379  212  114   36   93  108  1301
4     202710   2015-16        00  1610612741               CHI        26.0  67  67  2474.0  ...    79   279  358  321  110   43  132  124  1399
5     202710   2016-17        00  1610612741               CHI        27.0  76  75  2809.0  ...   129   341  470  417  143   32  159  112  1816
6     202710   2017-18        00  1610612750               MIN        28.0  59  59  2164.0  ...    79   235  314  288  116   24  108   78  1307
7     202710   2018-19        00  1610612750               MIN        29.0  10  10   361.0  ...    16    36   52   43   24   10   14   18   213
8     202710   2018-19        00  1610612755               PHI        29.0  55  55  1824.0  ...   105   185  290  220   99   29   81   93  1002
9     202710   2018-19        00           0               TOT        29.0  65  65  2185.0  ...   121   221  342  263  123   39   95  111  1215
>>> FG3_is_good.value_counts()
True     8
False    5
Name: FG3_PCT, dtype: int64
```

One funny thing that jumped out at me is that Jimmy has been unable to shoot better than 30% from three after the age of 30. Interesting. Furthermore, we can easily conclude Jimmy has shot better than 30% from 3 61% of the seasons he's played thus far.

Playoff Jimmy has been said to be a thing. One aspect of this is that he shoots better from three in the playoffs as well. We can use the same format as we did above to quickly figure out his percentage. Jimmy Butler's playoff stats happen to be [2] index of the original 'Jimmy' object we pulled down using the nba\_api:

```
>>> print(Jimmy.get_data_frames()[2])
   PLAYER_ID SEASON_ID LEAGUE_ID     TEAM_ID TEAM_ABBREVIATION  PLAYER_AGE  GP  GS    MIN  FGM  FGA  FG_PCT  ...  FTM  FTA  FT_PCT  OREB  DREB  REB  AST  STL  BLK  TOV  PF  PTS
0     202710   2011-12        00  1610612741               CHI        22.0   3   0    4.0    0    0   0.000  ...    0    0   0.000     0     0    0    0    0    0    0   1    0
1     202710   2012-13        00  1610612741               CHI        23.0  12  12  490.0   50  115   0.435  ...   45   55   0.818     9    53   62   32   15    6   16  26  160
2     202710   2013-14        00  1610612741               CHI        24.0   5   5  218.0   22   57   0.386  ...   18   23   0.783     6    20   26   11    6    0    3  13   68
3     202710   2014-15        00  1610612741               CHI        25.0  12  12  506.0   94  213   0.441  ...   59   72   0.819    18    49   67   38   29    9   21  27  275
4     202710   2016-17        00  1610612741               CHI        27.0   6   6  239.0   46  108   0.426  ...   38   47   0.809     9    35   44   26   10    5   15  10  136
5     202710   2017-18        00  1610612750               MIN        28.0   5   5  170.0   28   63   0.444  ...   15   18   0.833     3    27   30   20    4    1    5   9   79
6     202710   2018-19        00  1610612755               PHI        29.0  12  12  421.0   79  175   0.451  ...   63   72   0.875    22    50   72   62   18    7   22  20  233
7     202710   2019-20        00  1610612748               MIA        30.0  21  21  806.0  144  295   0.488  ...  164  191   0.859    46    90  136  127   41   14   59  37  467
8     202710   2020-21        00  1610612748               MIA        31.0   4   4  154.0   19   64   0.297  ...   16   22   0.727     6    24   30   28    5    1    9   6   58
9     202710   2021-22        00  1610612748               MIA        32.0  17  17  629.0  166  328   0.506  ...  111  132   0.841    41    84  125   78   35   11   25  25  466
```

Now I can quickly assign this to a variable so I can interact with it as a pandas object.

```
>>> Playoff_Jimmy = Jimmy.get_data_frames()[2]
>>> Playoff_Jimmy.loc[:,"FG3_PCT"] > 0.300
0    False
1     True
2    False
3     True
4    False
5     True
6    False
7     True
8    False
9     True
Name: FG3_PCT, dtype: bool
>>> Playoff_Jimmy.loc[:,"FG3_PCT"]
0    0.000
1    0.405
2    0.300
3    0.389
4    0.261
5    0.471
6    0.267
7    0.349
8    0.267
9    0.338
Name: FG3_PCT, dtype: float64
```

Kind of funny that Butler has a perfect True False pattern throughout his playoff career. Also, as with anything in IT there are at least 25 ways to do the same thing, the more you learn. Above I was able to pull the "FG3\_PCT" for each row. Here is another way to do the same thing using a for loop:

```
>>> for column, row in Playoff_Jimmy.iterrows():
...     print(str(row['SEASON_ID']) + ' 3ptfg%: ' + str(row['FG3_PCT']))
... 
2011-12 3ptfg%: 0.0
2012-13 3ptfg%: 0.405
2013-14 3ptfg%: 0.3
2014-15 3ptfg%: 0.389
2016-17 3ptfg%: 0.261
2017-18 3ptfg%: 0.471
2018-19 3ptfg%: 0.267
2019-20 3ptfg%: 0.349
2020-21 3ptfg%: 0.267
2021-22 3ptfg%: 0.338
```

## Conclusion

Well, if you read this far you realized we didn't do anything mind bending. I suppose writing this out and doing the same type of practice activities I'm doing in my DataCamp course on some data I pulled down myself helped me learn quite a bit more than simply going only through the course.

I've always enjoyed doing data parsing in Linux. I've mentioned in previous blog posts how much I've enjoyed doing log parsing on the Linux shell using cut, grep, awk, uniq and sort to break down logs. This data science stuff seems to tickle a bit of that same excitement. I'm also excited to continue this project. Specifically, making visualizations should be fun, and i'm sure i'll check back in here once I make it that far. I've seen some people plot shot charts as well, which would be a fun little side quest. I imagine a site like [statmuse.com](https://www.statmuse.com) does a lot of what's shown here behind the scenes when you ask a question.

![](https://artofnetworkengineering.com/wp-content/uploads/2022/09/screenshot-2022-09-29-at-1.52.10-pm.png?w=800)

See y'all around the bend.
