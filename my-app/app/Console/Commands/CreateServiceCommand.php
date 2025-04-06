<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class CreateServiceCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {className : The name of the service class}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new service class';

    /**
     * Directory path for services.
     *
     * @const string
     */
    private const SERVICES_PATH = 'app/Services/';

    /**
     * The class name of the service to create.
     *
     * @var string
     */
    private string $className;

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->className = Str::studly($this->argument('className'));

        if ($this->className === '') {
            $this->error('The service class name is invalid. Please provide a valid class name.');
            return;
        }

        $this->createServiceClass();
    }

    /**
     * Create the service class file.
     */
    private function createServiceClass(): void
    {
        $directoryPath = $this->getServiceDirectoryPath();

        // Create the directory if it doesn't exist
        if (!File::exists($directoryPath)) {
            File::makeDirectory($directoryPath, 0755, true);
        }

        $filePath = $this->getServiceFilePath();
        $fileContent = $this->getServiceClassTemplate();

        $this->writeFile($filePath, $fileContent);
    }

    /**
     * Get the full file path of the service class.
     *
     * @return string
     */
    private function getServiceFilePath(): string
    {
        return $this->getServiceDirectoryPath() . $this->className . '.php';
    }

    /**
     * Get the full directory path for service classes.
     *
     * @return string
     */
    private function getServiceDirectoryPath(): string
    {
        return base_path(self::SERVICES_PATH);
    }

    /**
     * Get the content of the service class.
     *
     * @return string
     */
    private function getServiceClassTemplate(): string
    {
        return "<?php\n\nnamespace App\\Services;\n\nclass {$this->className}\n{\n    // Implement your service methods here\n}\n";
    }

    /**
     * Write content to a file, handling existence and errors.
     *
     * @param string $filePath
     * @param string $fileContent
     */
    private function writeFile(string $filePath, string $fileContent): void
    {
        if (File::exists($filePath)) {
            $this->warn("File {$filePath} already exists.");
        } else {
            try {
                File::put($filePath, $fileContent);
                $this->info("Service {$this->className} created successfully.");
            } catch (\Exception $e) {
                $this->error("Failed to create file: {$filePath}. Error: " . $e->getMessage());
            }
        }
    }
}