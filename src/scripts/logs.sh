while read line; do curl -sS "$line" >> logs.txt; done < urls.txt