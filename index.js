function main() {
  if (process.argv.length < 3) {
    console.log('You need to add the day file name');
    return;
  }

  const fileName = process.argv[2];
  require(`./days/${fileName}`)();
}

main();
