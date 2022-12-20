#!/bin/sh

targetCoverage=1

coverageHTML="$(sed 's:^ *::g' < coverage/index.html | tr -d \\n)"
linesCoverageString=$(sed 's:.*<span class="strong">\([^<]*\)<.*:\1:' <<<"$coverageHTML")
linesCoverage=${linesCoverageString/%??/}
if [ 1 -eq "$(echo "${linesCoverage} < ${targetCoverage}" | bc)" ]
then
    echo "Coverage is going down! ${linesCoverage}/${targetCoverage}"
    exit 1
fi
