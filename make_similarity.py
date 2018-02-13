
import argparse
import operator

def parse_colour(inputfile):
    colours = {}
    with open(inputfile, 'r') as f:
        for line in f:
            name, colour = line.rstrip("\n").split("\t")
            colours[name] = colour.split(",")
    f.close()
    similar = {}
    for name1 in colours.keys():
        r1, g1, b1 = colours[name1]
        if name1 not in similar: similar[name1] = {}
        for name2 in colours.keys():
            r2, g2, b2 = colours[name2]
            similar[name1][name2] = ((int(r2)-int(r1))*0.30)**2 + ((int(g2)-int(g1))*0.59)**2 + ((int(b2)-int(b1))*0.11)**2
    return similar

def parse_location(inputfile):
    print "TODO"
    return {}

def parse_date(inputfile, prev=False):
    dates = []
    with open(inputfile, 'r') as f:
        for line in f:
            name = line.rstrip("\n")
            dates.append(name)
    similar = {}
    for idx, name1 in enumerate(dates):
        if name1 not in similar: similar[name1] = {}
        if not prev:
            for acc in range(idx, len(dates) + idx): # going forward
                didx = acc
                if acc >= len(dates): didx = acc - len(dates) # wrap around
                name2 = dates[didx]
                similar[name1][name2] = acc - idx
        else:
            for acc in range(idx - len(dates), idx): # going backwards
                name2 = dates[acc]
                similar[name1][name2] = idx - acc
    return similar

def parse_dateprev(inputfile):
    return parse_date(inputfile, True)

def parse_correctly(attribtype, inputfile):
    case = {
        'colour': parse_colour,
        'date': parse_date,
        'dateprev': parse_dateprev,
        'location': parse_location,
    }
    func = case.get(attribtype, lambda: "nothing")
    return func(inputfile)

def print_similarities(similar, nbest):
    for f1 in similar.keys():
        seen = 0
        for t in sorted(similar[f1].items(), key=operator.itemgetter(1)):
            f2, dist = t
            if f1==f2: continue
            if seen >= int(nbest): break
            print f1 + "\t" + f2 + "\t" + str(similar[f1][f2])
            seen+=1


def main():
    parser = argparse.ArgumentParser(description="Generate similarity from attributes")
    parser.add_argument('-f', '--file',
                required=True,
                dest='inputfile',
                help="list of input files to parse")
    parser.add_argument('-t', '--type',
                required=True,
                dest='attribtype',
                help="attribute to calculate distances from")
    parser.add_argument('-n', '--nbest',
                required=True,
                dest='nbest',
                help="how many similarities to keep")
    args=parser.parse_args()

    similar = parse_correctly(args.attribtype, args.inputfile)
    print_similarities(similar, args.nbest)



if __name__ == "__main__":
    main()
