# This script helps witgh basic transformation of a regular SVG preview to a
# React component preview.
#
# Usage:
#
#     ./generate-preview.sh path/to.svg path/to/ReactComponent.tsx
#
# This script requires you have `svgr` and `sd` installed. To install `svgr`,
# run `npm i @svgr/cli`. To install `sd`, follow this:
#
#     https://github.com/chmln/sd#installation
#
# or you may rewrite it using `sed` :)

echo 'import { PreviewProps, stringify } from "./common";' > $2
echo '// const getColor = stringify(props.getColor);' >> $2

svgr --no-svgo < $1 | sd 'className="([\w_]+)"' 'fill={getColor({ variable: `$1` })}' >> $2
