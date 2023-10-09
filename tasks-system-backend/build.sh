echo "BACKEND BUILD PROCESS - has been started"
echo "----------------------------------------"

echo ""

echo "Removing old jar files"
rm deploy/task-system-backend.jar

echo "clean project"
mvn clean

echo "Generating jar file"
mvn package

echo "moving jar to deploy directory"
mv target/task-system-backend.jar deploy/

echo "----------------------------------------"
echo "BACKEND BUILD PROCESS - finished"
