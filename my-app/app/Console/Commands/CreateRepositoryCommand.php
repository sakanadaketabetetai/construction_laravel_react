<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class CreateRepositoryCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository {className : The name of the repository class}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new repository class';

    /**
     * Directory path for repositories.
     *
     * @const string
     */
    private const REPOSITORIES_PATH = 'app/Repositories/';

    /**
     * The class name of the repository to create.
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
            $this->error('The repository class name is invalid. Please provide a valid class name.');
            return;
        }

        $this->createRepositoryClass();
    }

    /**
     * Create the repository class file.
     */
    private function createRepositoryClass(): void
    {
        $directoryPath = $this->getRepositoryDirectoryPath();

        // Create the directory if it doesn't exist
        if (!File::exists($directoryPath)) {
            File::makeDirectory($directoryPath, 0755, true);
        }

        $filePath = $this->getRepositoryFilePath();
        $fileContent = $this->getRepositoryClassTemplate();

        $this->writeFile($filePath, $fileContent);
    }

    /**
     * Get the full file path of the repository class.
     *
     * @return string
     */
    private function getRepositoryFilePath(): string
    {
        return $this->getRepositoryDirectoryPath() . $this->className . '.php';
    }

    /**
     * Get the full directory path for repository classes.
     *
     * @return string
     */
    private function getRepositoryDirectoryPath(): string
    {
        return base_path(self::REPOSITORIES_PATH);
    }

    /**
     * 
     * Get the content of the repository class.
     *
     * @return string
     */
    private function getRepositoryClassTemplate(): string
    {
        return "<?php\n\nnamespace App\\Repositories;\n\nclass {$this->className} implements {$this->className}Interface \n{\n    // Implement your repository methods here\n}\n";
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
                $this->info("Repository {$this->className} created successfully.");
            } catch (\Exception $e) {
                $this->error("Failed to create file: {$filePath}. Error: " . $e->getMessage());
            }
        }
    }
}