#!/usr/bin/env ruby
require 'fileutils'

PROGNAME = 'pre-commit (auto-generate sketch previews)'

def main
  progress "Installing sketchtool"
  system!(%W[/Applications/Sketch.app/Contents/Resources/sketchtool/install.sh])

  progress "Looking for changed or added .sketch files"
  diff_output = capture!(%W[git diff --name-only --cached --pretty=format:])
  sketch_files = diff_output.split("\n").grep(/\.sketch\z/)
  if sketch_files.empty?
    progress "No sketch files to create preview images for in this commit!"
  end
  puts sketch_files

  sketch_files.each do |f|
    unless File.exist?(f)
      progress "#{f} does not exist (anymore?)"
      next
    end

    png_output_dir = f.sub(/\.sketch\z/, '') + '-sketch-previews'
    progress "deleting old previews"
    FileUtils.rm_rf(png_output_dir)

    progress "exporting pages"
    cmd = %W[sketchtool --overwriting=YES --output=#{png_output_dir} export pages #{f}]
    system!(cmd)

    progress "adding to git"
    system!(%W[git add #{png_output_dir}])
  end
end

def system!(cmd)
  puts "running: #{cmd.join(' ')}"
  abort failure_message(cmd) unless system(*cmd)
end

def capture!(cmd)
  puts "capturing: #{cmd.join(' ')}"
  result = IO.popen(cmd) { |io| io.read }
  abort failure_message(cmd) unless $?.success?
  result
end

def failure_message(cmd)
  "#{PROGNAME}: command failed: #{cmd.join(' ')}"
end

def progress(msg)
  puts "#{PROGNAME}: #{msg}"
end

main
